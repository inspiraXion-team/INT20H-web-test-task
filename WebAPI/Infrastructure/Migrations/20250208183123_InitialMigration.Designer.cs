﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250208183123_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entities.AuthorRating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<decimal>("Rating")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId")
                        .IsUnique();

                    b.ToTable("AuthorRatings");
                });

            modelBuilder.Entity("Domain.Entities.Chat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("Domain.Entities.ChatMessage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ChatId")
                        .HasColumnType("int");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SentAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ChatId");

                    b.HasIndex("UserId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("Domain.Entities.ChatParticipant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ChatId")
                        .HasColumnType("int");

                    b.Property<bool>("IsCreator")
                        .HasColumnType("bit");

                    b.Property<DateTime>("JoinedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ChatId");

                    b.HasIndex("UserId");

                    b.ToTable("ChatParticipants");
                });

            modelBuilder.Entity("Domain.Entities.Genre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Genres");
                });

            modelBuilder.Entity("Domain.Entities.MediaContent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("MediaContents");
                });

            modelBuilder.Entity("Domain.Entities.Quest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GenreId")
                        .HasColumnType("int");

                    b.Property<bool>("IsPublished")
                        .HasColumnType("bit");

                    b.Property<int>("PlayerLimit")
                        .HasColumnType("int");

                    b.Property<string>("PosterURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TimeLimit")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("GenreId");

                    b.ToTable("Quests");
                });

            modelBuilder.Entity("Domain.Entities.QuestProgress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CompletedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("QuestId")
                        .HasColumnType("int");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestId");

                    b.HasIndex("UserId");

                    b.ToTable("QuestProgresses");
                });

            modelBuilder.Entity("Domain.Entities.QuestRating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("QuestId")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestId");

                    b.HasIndex("UserId");

                    b.ToTable("QuestRatings");
                });

            modelBuilder.Entity("Domain.Entities.QuestTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("GenreId")
                        .HasColumnType("int");

                    b.Property<int>("Order")
                        .HasColumnType("int");

                    b.Property<int>("QuestId")
                        .HasColumnType("int");

                    b.Property<int>("QuestionType")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GenreId");

                    b.HasIndex("QuestId");

                    b.ToTable("QuestTasks");
                });

            modelBuilder.Entity("Domain.Entities.Reward", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("AwardedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Rewards");
                });

            modelBuilder.Entity("Domain.Entities.TaskImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AnswerX1")
                        .HasColumnType("int");

                    b.Property<int>("AnswerX2")
                        .HasColumnType("int");

                    b.Property<int>("AnswerY1")
                        .HasColumnType("int");

                    b.Property<int>("AnswerY2")
                        .HasColumnType("int");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskId")
                        .IsUnique();

                    b.ToTable("TaskImages");
                });

            modelBuilder.Entity("Domain.Entities.TaskOption", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsCorrect")
                        .HasColumnType("bit");

                    b.Property<string>("OptionText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.ToTable("TaskOptions");
                });

            modelBuilder.Entity("Domain.Entities.TaskProgress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CompletedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("StartedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskId");

                    b.HasIndex("UserId");

                    b.ToTable("TaskProgresses");
                });

            modelBuilder.Entity("Domain.Entities.TaskWrite", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskId")
                        .IsUnique();

                    b.ToTable("TaskWrites");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AvatarURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Entities.AuthorRating", b =>
                {
                    b.HasOne("Domain.Entities.User", "Author")
                        .WithOne("Rating")
                        .HasForeignKey("Domain.Entities.AuthorRating", "AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Domain.Entities.ChatMessage", b =>
                {
                    b.HasOne("Domain.Entities.Chat", "Chat")
                        .WithMany("ChatMessages")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("ChatMessages")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.ChatParticipant", b =>
                {
                    b.HasOne("Domain.Entities.Chat", "Chat")
                        .WithMany("Participants")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("ChatParticipants")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.MediaContent", b =>
                {
                    b.HasOne("Domain.Entities.QuestTask", "Task")
                        .WithMany("MediaContents")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("Domain.Entities.Quest", b =>
                {
                    b.HasOne("Domain.Entities.User", "Author")
                        .WithMany("Quests")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Genre", "Genre")
                        .WithMany("Quests")
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("Domain.Entities.QuestProgress", b =>
                {
                    b.HasOne("Domain.Entities.Quest", "Quest")
                        .WithMany("QuestProgresses")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("QuestProgresses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Quest");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.QuestRating", b =>
                {
                    b.HasOne("Domain.Entities.Quest", "Quest")
                        .WithMany("Rating")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("QuestRatings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Quest");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.QuestTask", b =>
                {
                    b.HasOne("Domain.Entities.Genre", "Genre")
                        .WithMany("Tasks")
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Quest", "Quest")
                        .WithMany("QuestTasks")
                        .HasForeignKey("QuestId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Genre");

                    b.Navigation("Quest");
                });

            modelBuilder.Entity("Domain.Entities.Reward", b =>
                {
                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("Rewards")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.TaskImage", b =>
                {
                    b.HasOne("Domain.Entities.QuestTask", "Task")
                        .WithOne("Image")
                        .HasForeignKey("Domain.Entities.TaskImage", "TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("Domain.Entities.TaskOption", b =>
                {
                    b.HasOne("Domain.Entities.QuestTask", "Task")
                        .WithMany("TaskOptions")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("Domain.Entities.TaskProgress", b =>
                {
                    b.HasOne("Domain.Entities.QuestTask", "Task")
                        .WithMany("TaskProgresses")
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("TaskProgresses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Task");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.TaskWrite", b =>
                {
                    b.HasOne("Domain.Entities.QuestTask", "Task")
                        .WithOne("TaskWrite")
                        .HasForeignKey("Domain.Entities.TaskWrite", "TaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("Domain.Entities.Chat", b =>
                {
                    b.Navigation("ChatMessages");

                    b.Navigation("Participants");
                });

            modelBuilder.Entity("Domain.Entities.Genre", b =>
                {
                    b.Navigation("Quests");

                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("Domain.Entities.Quest", b =>
                {
                    b.Navigation("QuestProgresses");

                    b.Navigation("QuestTasks");

                    b.Navigation("Rating");
                });

            modelBuilder.Entity("Domain.Entities.QuestTask", b =>
                {
                    b.Navigation("Image");

                    b.Navigation("MediaContents");

                    b.Navigation("TaskOptions");

                    b.Navigation("TaskProgresses");

                    b.Navigation("TaskWrite");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Navigation("ChatMessages");

                    b.Navigation("ChatParticipants");

                    b.Navigation("QuestProgresses");

                    b.Navigation("QuestRatings");

                    b.Navigation("Quests");

                    b.Navigation("Rating")
                        .IsRequired();

                    b.Navigation("Rewards");

                    b.Navigation("TaskProgresses");
                });
#pragma warning restore 612, 618
        }
    }
}
