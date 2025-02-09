﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<AuthorRating> AuthorRatings { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<ChatParticipant> ChatParticipants { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<MediaContent> MediaContents { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<QuestProgress> QuestProgresses { get; set; }
        public DbSet<QuestRating> QuestRatings { get; set; }
        public DbSet<QuestTask> QuestTasks { get; set; }
        public DbSet<Reward> Rewards { get; set; }
        public DbSet<TaskImage> TaskImages { get; set; }
        public DbSet<TaskOption> TaskOptions { get; set; }
        public DbSet<TaskProgress> TaskProgresses { get; set; }
        public DbSet<TaskWrite> TaskWrites { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // AuthorRating
            modelBuilder.Entity<AuthorRating>()
                .HasOne(ar => ar.Author)
                .WithOne(u => u.Rating)
                .HasForeignKey<AuthorRating>(ar => ar.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            // Chat
            modelBuilder.Entity<Chat>()
                .HasMany(c => c.ChatMessages)
                .WithOne(cm => cm.Chat)
                .HasForeignKey(cm => cm.ChatId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Chat>()
                .HasMany(c => c.Participants)
                .WithOne(cp => cp.Chat)
                .HasForeignKey(cp => cp.ChatId)
                .OnDelete(DeleteBehavior.Cascade);

            // ChatMessage
            modelBuilder.Entity<ChatMessage>()
                .HasOne(cm => cm.User)
                .WithMany(u => u.ChatMessages)
                .HasForeignKey(cm => cm.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // ChatParticipant
            modelBuilder.Entity<ChatParticipant>()
                .HasOne(cp => cp.User)
                .WithMany(u => u.ChatParticipants)
                .HasForeignKey(cp => cp.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Quest
            modelBuilder.Entity<Quest>()
                .HasOne(q => q.Author)
                .WithMany(u => u.Quests)
                .HasForeignKey(q => q.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Quest>()
                .HasOne(q => q.Genre)
                .WithMany(g => g.Quests)
                .HasForeignKey(q => q.GenreId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Quest>()
                .HasMany(q => q.QuestTasks)
                .WithOne(qt => qt.Quest)
                .HasForeignKey(qt => qt.QuestId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Quest>()
                .HasMany(q => q.Rating)
                .WithOne(qr => qr.Quest)
                .HasForeignKey(qr => qr.QuestId)
                .OnDelete(DeleteBehavior.Cascade);

            // QuestProgress
            modelBuilder.Entity<QuestProgress>()
                .HasOne(qp => qp.User)
                .WithMany(u => u.QuestProgresses)
                .HasForeignKey(qp => qp.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<QuestProgress>()
                .HasOne(qp => qp.Quest)
                .WithMany(q => q.QuestProgresses)
                .HasForeignKey(qp => qp.QuestId)
                .OnDelete(DeleteBehavior.NoAction);

            // QuestRating
            modelBuilder.Entity<QuestRating>()
                .HasOne(qr => qr.User)
                .WithMany(u => u.QuestRatings)
                .HasForeignKey(qr => qr.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // QuestTask
            modelBuilder.Entity<QuestTask>()
                .HasOne(qt => qt.Quest)
                .WithMany(q => q.QuestTasks)
                .HasForeignKey(qt => qt.QuestId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<QuestTask>()
                .HasOne(qt => qt.Genre)
                .WithMany(g => g.Tasks)
                .HasForeignKey(qt => qt.GenreId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuestTask>()
                .HasMany(qt => qt.TaskOptions)
                .WithOne(to => to.Task)
                .HasForeignKey(to => to.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuestTask>()
                .HasMany(qt => qt.MediaContents)
                .WithOne(mc => mc.Task)
                .HasForeignKey(mc => mc.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuestTask>()
                .HasMany(qt => qt.TaskProgresses)
                .WithOne(tp => tp.Task)
                .HasForeignKey(tp => tp.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            // Reward
            modelBuilder.Entity<Reward>()
                .HasOne(r => r.User)
                .WithMany(u => u.Rewards)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // TaskProgress
            modelBuilder.Entity<TaskProgress>()
                .HasOne(tp => tp.User)
                .WithMany(u => u.TaskProgresses)
                .HasForeignKey(tp => tp.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // TaskWrite
            modelBuilder.Entity<TaskWrite>()
                .HasOne(tw => tw.Task)
                .WithOne(qt => qt.TaskWrite)
                .HasForeignKey<TaskWrite>(tw => tw.TaskId)
                .OnDelete(DeleteBehavior.Cascade);

            // TaskImage
            modelBuilder.Entity<TaskImage>()
                .HasOne(ti => ti.Task)
                .WithOne(qt => qt.Image)
                .HasForeignKey<TaskImage>(ti => ti.TaskId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
