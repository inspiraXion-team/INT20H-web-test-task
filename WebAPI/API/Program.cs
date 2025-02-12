using System.Text;
using Domain.Interfaces;
using DotNetEnv;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Loading variables from the .env file
Env.Load();

builder.Configuration.AddEnvironmentVariables();
// Getting secret values from the .env
var dbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
var googleClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
var googleClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");
var facebookClientId = Environment.GetEnvironmentVariable("FACEBOOK_CLIENT_ID");
var facebookClientSecret = Environment.GetEnvironmentVariable("FACEBOOK_CLIENT_SECRET");

Console.WriteLine("AZURE_BLOB_STORAGE_CONNECTION_STRING: " + Environment.GetEnvironmentVariable("AZURE_BLOB_STORAGE_CONNECTION_STRING"));
Console.WriteLine("AZURE_BLOB_STORAGE_CONTAINER_NAME: " + Environment.GetEnvironmentVariable("AZURE_BLOB_STORAGE_CONTAINER_NAME"));

// Checking if the required values are present
if (string.IsNullOrEmpty(dbConnectionString) ||
    string.IsNullOrEmpty(googleClientId) ||
    string.IsNullOrEmpty(googleClientSecret) ||
    string.IsNullOrEmpty(facebookClientId) ||
    string.IsNullOrEmpty(facebookClientSecret))
{
    throw new ArgumentException("Not all necessary environment variables were found in the .env file.");
}

// Debugging: Print loaded DB Connection String
Console.WriteLine("Loaded DB Connection String: " + dbConnectionString);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:4173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials()
                  .WithExposedHeaders("Connection", "Upgrade");
        });
});

// Adding database connection using the value from .env
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(dbConnectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
    })
);

// Adding services to the container
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISocialAuthService, SocialAuthService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();
builder.Services.AddScoped<IFileStorageService, AzureBlobStorageService>();
builder.Services.AddScoped<IQuestConstructorService, QuestConstructorService>();
builder.Services.AddScoped<IQuestSessionManager, QuestSessionManager>();
builder.Services.AddScoped<IQuestService, QuestService>();
builder.Services.AddScoped<IQuestRatingService, QuestRatingService>();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.UTF8.GetBytes(jwtSettings["Secret"]);

// Configuring authentication with Google and Facebook
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
})
.AddGoogle(googleOptions =>
{
    googleOptions.ClientId = googleClientId;
    googleOptions.ClientSecret = googleClientSecret;
})
.AddFacebook(facebookOptions =>
{
    facebookOptions.ClientId = facebookClientId;
    facebookOptions.ClientSecret = facebookClientSecret;
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use the specific CORS policy that we configured
app.UseCors("AllowSpecificOrigins");

// Configuring the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseWebSockets();

app.MapControllers();

app.Run();