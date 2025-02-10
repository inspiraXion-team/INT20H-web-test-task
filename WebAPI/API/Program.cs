using Domain.Interfaces;
using DotNetEnv;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Loading variables from the .env file
Env.Load();

// Getting secret values from the .env
var dbConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
var googleClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
var googleClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET");
var facebookClientId = Environment.GetEnvironmentVariable("FACEBOOK_CLIENT_ID");
var facebookClientSecret = Environment.GetEnvironmentVariable("FACEBOOK_CLIENT_SECRET");

// Checking if the required values are present
if (string.IsNullOrEmpty(dbConnectionString) ||
    string.IsNullOrEmpty(googleClientId) ||
    string.IsNullOrEmpty(googleClientSecret) ||
    string.IsNullOrEmpty(facebookClientId) ||
    string.IsNullOrEmpty(facebookClientSecret))
{
    throw new ArgumentException("Not all necessary environment variables were found in the .env file.");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:4173")
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

// Configuring authentication with Google and Facebook
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
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

app.UseCors("AllowAll");

// Configuring the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
