BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserAccount] (
    [id] INT NOT NULL IDENTITY(1,1),
    [uid] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UserAccount_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserAccount_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserAccount_uid_key] UNIQUE NONCLUSTERED ([uid]),
    CONSTRAINT [UserAccount_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [UserAccount_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Post_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [ownerId] INT NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Post_ownerId_idx] ON [dbo].[Post]([ownerId]);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_ownerId_fkey] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[UserAccount]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
