IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [COMUNAS] (
        [COM_ID] int NOT NULL IDENTITY,
        [COM_NOMBRE] nvarchar(max) NOT NULL,
        [COM_CREADO] nvarchar(max) NULL,
        [COM_ACTUALIZADO] datetime2 NULL,
        [CIU_ID] int NULL,
        CONSTRAINT [PK_COMUNAS] PRIMARY KEY ([COM_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [CONFIGURACION] (
        [CON_ID] int NOT NULL IDENTITY,
        [CON_NOMBRE] nvarchar(max) NOT NULL,
        [CON_JSON] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_CONFIGURACION] PRIMARY KEY ([CON_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [DOCUMENTOS] (
        [DOC_ID] int NOT NULL IDENTITY,
        [DOC_NOMBRE] nvarchar(max) NOT NULL,
        [DOC_CREADO] datetime2 NULL,
        [DOC_FILE] nvarchar(max) NOT NULL,
        [DOC_TIPO_USUARIO] int NOT NULL,
        [SOL_ID] int NOT NULL,
        CONSTRAINT [PK_DOCUMENTOS] PRIMARY KEY ([DOC_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [HISTORIAL_SEGUIMIENTO] (
        [HIS_ID] int NOT NULL IDENTITY,
        [HIS_MENSAJE] nvarchar(max) NULL,
        [HIS_CREADO] datetime2 NULL,
        [SOL_ID] int NULL,
        CONSTRAINT [PK_HISTORIAL_SEGUIMIENTO] PRIMARY KEY ([HIS_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [MARCAS] (
        [MAR_ID] int NOT NULL IDENTITY,
        [MAR_NOMBRE] nvarchar(max) NOT NULL,
        [MAR_CREADO] datetime2 NULL,
        [MAR_ACTUALIZADO] datetime2 NULL,
        [MAR_MANTENCION] int NULL,
        CONSTRAINT [PK_MARCAS] PRIMARY KEY ([MAR_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [SERVICIOS_AGRUPACION] (
        [SER_AGRUP_ID] int NOT NULL IDENTITY,
        [SER_AGRUP_NOMBRE] nvarchar(max) NULL,
        [SER_AGRUP_ICON] nvarchar(max) NULL,
        [SER_AGROUP_ORDEN] tinyint NULL,
        [SER_AGRUP_ACTIVO] tinyint NULL,
        CONSTRAINT [PK_SERVICIOS_AGRUPACION] PRIMARY KEY ([SER_AGRUP_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [SUCURSALES] (
        [SUC_ID] int NOT NULL IDENTITY,
        [SUC_NOMBRE] nvarchar(max) NULL,
        [SUC_EMAIL] nvarchar(max) NULL,
        [SUC_TELEFONO] nvarchar(max) NULL,
        [SUC_URL] nvarchar(max) NULL,
        [SUC_DIRECCION] nvarchar(max) NULL,
        [SUC_LATITUD] int NULL,
        [SUC_LONGITUD] int NULL,
        [SUC_CREADO] datetime2 NULL,
        [SUC_ACTUALIZADO] datetime2 NULL,
        [DIS_ID] int NULL,
        [COM_ID] int NULL,
        [CIU_ID] int NULL,
        [REG_ID] int NULL,
        [PAI_ID] int NULL,
        [SUC_ID_RESPUESTA] int NULL,
        [SUC_COBERTURA_KM] int NULL,
        [SUC_HORARIO] nvarchar(max) NULL,
        [SUC_MULTIMARCA] tinyint NULL,
        [SUC_OFICIAL] tinyint NULL,
        [SUC_FECHA_CONTRATO] datetime2 NULL,
        [SER_ID] int NULL,
        [ASE_ID] nvarchar(max) NULL,
        CONSTRAINT [PK_SUCURSALES] PRIMARY KEY ([SUC_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [USUARIOS] (
        [USU_ID] int NOT NULL IDENTITY,
        [USU_NOMBRE] nvarchar(max) NULL,
        [USU_RUT] nvarchar(max) NULL,
        [USU_EMAIL] nvarchar(max) NOT NULL,
        [USU_CONTRASENA] nvarchar(max) NULL,
        [USU_DIRECCION] nvarchar(max) NULL,
        [USU_DIRECCION_NUMERO] nvarchar(max) NULL,
        [COM_ID] int NULL,
        [USU_GENERO] nvarchar(max) NULL,
        [USU_TELEFONO] nvarchar(max) NULL,
        [USU_LATITUD] int NULL,
        [USU_LONGITUD] int NULL,
        [USU_CREADO] datetime2 NULL,
        [USU_ACTUALIZADO] datetime2 NULL,
        [PAI_ID] int NULL,
        [USU_DEVICE_TOKEN] nvarchar(max) NULL,
        [USU_ORIGEN] nvarchar(max) NULL,
        [USU_BADGE] int NULL,
        [USU_SESION] bit NULL,
        [USU_FCB] bit NULL,
        [USU_FCB_ID] int NULL,
        [USU_BADGE_S] tinyint NULL,
        [USU_BADGE_O] tinyint NULL,
        [USU_WAZE] tinyint NULL,
        [USU_COD_VERIFICACION] nvarchar(max) NULL,
        CONSTRAINT [PK_USUARIOS] PRIMARY KEY ([USU_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [USUARIOSWEB] (
        [USW_ID] int NOT NULL IDENTITY,
        [USW_RUT] nvarchar(max) NULL,
        [USW_NOMBRE] nvarchar(max) NULL,
        [USW_TELEFONO] nvarchar(max) NULL,
        [USW_EMAIL] nvarchar(max) NOT NULL,
        [USW_CONTRASENA] nvarchar(max) NOT NULL,
        [USW_TOKEN_CAMBIO_CLAVE] nvarchar(max) NULL,
        [USW_FECHA_CAMBIO_CLAVE] datetime2 NULL,
        [USW_FECHA_RECORDADO] datetime2 NULL,
        [USW_CANT_CONEXIONES] int NULL,
        [USW_IP_ULTIMA_CONEXION] nvarchar(max) NULL,
        [USW_CONEXION_ACTUAL] datetime2 NULL,
        [USW_ULTIMA_CONEXION] datetime2 NULL,
        [USW_IP_CONEXION_ACTUAL] nvarchar(max) NULL,
        [USW_CREADO] datetime2 NULL,
        [USW_ACTUALIZADO] datetime2 NULL,
        [USW_TIPO] nvarchar(1) NULL,
        [PAI_ID] int NOT NULL,
        [DIS_ID] int NULL,
        [SUC_ID] int NULL,
        [IMP_ID] int NULL,
        [USW_ACEPT_TERMINOS] nvarchar(1) NULL,
        [USW_DEVICE_TOKEN] nvarchar(max) NULL,
        [USW_BADGE] tinyint NULL,
        [USW_SESION] tinyint NULL,
        [USW_ACTIVO] int NULL,
        CONSTRAINT [PK_USUARIOSWEB] PRIMARY KEY ([USW_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [VIEW_DASHBOARD_SOL_COUNT] (
        [VIE_RECEPCIONADAS] int NOT NULL,
        [VIE_ATENDIDAS] int NOT NULL,
        [VIE_PROGRESO] int NOT NULL,
        [VIE_FINALIZADAS] int NOT NULL
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [MODELOS] (
        [MOD_ID] int NOT NULL IDENTITY,
        [MOD_NOMBRE] nvarchar(max) NOT NULL,
        [MOD_CREADO] datetime2 NULL,
        [MOD_ACTUALIZADO] datetime2 NULL,
        [MAR_ID] int NOT NULL,
        CONSTRAINT [PK_MODELOS] PRIMARY KEY ([MOD_ID]),
        CONSTRAINT [FK_MODELOS_MARCAS_MAR_ID] FOREIGN KEY ([MAR_ID]) REFERENCES [MARCAS] ([MAR_ID]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [SERVICIOS] (
        [SER_ID] int NOT NULL IDENTITY,
        [SER_NOMBRE] nvarchar(max) NULL,
        [SER_CREADO] datetime2 NULL,
        [SER_ACTUALIZADO] datetime2 NULL,
        [SER_AGROUP_ID] int NOT NULL,
        [SER_MENU] tinyint NULL,
        [SER_MENU_ORDEN] tinyint NULL,
        [SER_ACTIVO] tinyint NULL,
        CONSTRAINT [PK_SERVICIOS] PRIMARY KEY ([SER_ID]),
        CONSTRAINT [FK_SERVICIOS_SERVICIOS_AGRUPACION_SER_AGROUP_ID] FOREIGN KEY ([SER_AGROUP_ID]) REFERENCES [SERVICIOS_AGRUPACION] ([SER_AGRUP_ID]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [VEHICULOS] (
        [VEH_ID] int NOT NULL IDENTITY,
        [VEH_VIM] nvarchar(max) NULL,
        [VEH_ALIAS] nvarchar(max) NULL,
        [VEH_KILOMETRAJE] int NULL,
        [VEH_ANO] int NULL,
        [VEH_PROXIMA_MANTENCION] int NULL,
        [VEH_URL_IMAGEN] nvarchar(max) NULL,
        [VEH_ON_SALE] tinyint NULL,
        [VEH_TRANSMISION] tinyint NULL,
        [VEH_COMBUSTIBLE] tinyint NULL,
        [VEH_ORIGEN] tinyint NULL,
        [VEH_GARANTIA_KM] int NULL,
        [VEH_GARANTIA_ANOS] int NULL,
        [VEH_FECHA_COMPRA] datetime2 NULL,
        [VEH_CREADO] datetime2 NULL,
        [VEH_ACTUALIZADO] datetime2 NULL,
        [VEH_KM_X_MES] int NULL,
        [USU_ID] int NULL,
        [MAR_ID] int NULL,
        [MOD_ID] int NULL,
        [ASE_ID] int NULL,
        [DIS_ID] int NULL,
        [SUC_ID] int NULL,
        [VEH_ESTADO] nvarchar(max) NULL,
        [VEH_PRINCIPAL] nvarchar(max) NULL,
        [VEH_FECHA_UPDATE] datetime2 NULL,
        [VEH_PATENTE] nvarchar(max) NULL,
        CONSTRAINT [PK_VEHICULOS] PRIMARY KEY ([VEH_ID]),
        CONSTRAINT [FK_VEHICULOS_MARCAS_MAR_ID] FOREIGN KEY ([MAR_ID]) REFERENCES [MARCAS] ([MAR_ID]),
        CONSTRAINT [FK_VEHICULOS_MODELOS_MOD_ID] FOREIGN KEY ([MOD_ID]) REFERENCES [MODELOS] ([MOD_ID]),
        CONSTRAINT [FK_VEHICULOS_USUARIOS_USU_ID] FOREIGN KEY ([USU_ID]) REFERENCES [USUARIOS] ([USU_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [SERVICIOS_X_SUCURSALES] (
        [ID] int NOT NULL IDENTITY,
        [SUC_ID] int NOT NULL,
        [SER_ID] int NOT NULL,
        [SES_VIGENCIA] nvarchar(1) NULL,
        CONSTRAINT [PK_SERVICIOS_X_SUCURSALES] PRIMARY KEY ([ID]),
        CONSTRAINT [FK_SERVICIOS_X_SUCURSALES_SERVICIOS_SER_ID] FOREIGN KEY ([SER_ID]) REFERENCES [SERVICIOS] ([SER_ID]) ON DELETE CASCADE,
        CONSTRAINT [FK_SERVICIOS_X_SUCURSALES_SUCURSALES_SUC_ID] FOREIGN KEY ([SUC_ID]) REFERENCES [SUCURSALES] ([SUC_ID]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [SOLICITUDES] (
        [SOL_ID] int NOT NULL IDENTITY,
        [SOL_TITULO] nvarchar(max) NULL,
        [SOL_DESCRIPCION] nvarchar(max) NULL,
        [SOL_FECHA_CREACION] datetime2 NULL,
        [SOL_FECHA_EXPIRACION] datetime2 NULL,
        [SOL_ESTADO] nvarchar(1) NULL,
        [SOL_FECHA_RESPUESTA] datetime2 NULL,
        [SOL_LATITUD] int NULL,
        [SOL_LONGITUD] int NULL,
        [SOL_PRECIO] int NULL,
        [SOL_CREADO] datetime2 NULL,
        [SOL_ACTUALIZADO] datetime2 NULL,
        [USU_ID] int NOT NULL,
        [VEH_ID] int NULL,
        [SUC_ID] int NULL,
        [SUC_ID_RESPUESTA] int NULL,
        [SOL_RESPUESTA] nvarchar(max) NULL,
        [SOL_FECHA_LECTURA] datetime2 NULL,
        [SOL_CORREO_ENVIADO] nvarchar(max) NULL,
        [SOL_ORIGEN] nvarchar(1) NULL,
        [SER_ID] int NULL,
        [USW_ID] int NULL,
        [COM_ID] int NULL,
        CONSTRAINT [PK_SOLICITUDES] PRIMARY KEY ([SOL_ID]),
        CONSTRAINT [FK_SOLICITUDES_SERVICIOS_SER_ID] FOREIGN KEY ([SER_ID]) REFERENCES [SERVICIOS] ([SER_ID]),
        CONSTRAINT [FK_SOLICITUDES_USUARIOS_USU_ID] FOREIGN KEY ([USU_ID]) REFERENCES [USUARIOS] ([USU_ID]) ON DELETE CASCADE,
        CONSTRAINT [FK_SOLICITUDES_USUARIOSWEB_USW_ID] FOREIGN KEY ([USW_ID]) REFERENCES [USUARIOSWEB] ([USW_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [CHAT] (
        [CHAT_ID] int NOT NULL IDENTITY,
        [SOL_ID] int NULL,
        [CHAT_MENSAJE] nvarchar(max) NOT NULL,
        [CHAT_FECHA_ENVIO] datetime2 NULL,
        [CHAT_USUARIO] tinyint NULL,
        [CHAT_USUARIO_WEB] tinyint NULL,
        [CHAT_DOCUMENTO] int NOT NULL,
        CONSTRAINT [PK_CHAT] PRIMARY KEY ([CHAT_ID]),
        CONSTRAINT [FK_CHAT_SOLICITUDES_SOL_ID] FOREIGN KEY ([SOL_ID]) REFERENCES [SOLICITUDES] ([SOL_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE TABLE [CHAT_WEB] (
        [CHAT_WEB_ID] int NOT NULL IDENTITY,
        [SOL_ID] int NULL,
        [CHAT_MENSAJE] nvarchar(max) NOT NULL,
        [CHAT_FECHA_ENVIO] datetime2 NULL,
        [USW_ID] int NULL,
        [CHAT_DOCUMENTO] int NOT NULL,
        CONSTRAINT [PK_CHAT_WEB] PRIMARY KEY ([CHAT_WEB_ID]),
        CONSTRAINT [FK_CHAT_WEB_SOLICITUDES_SOL_ID] FOREIGN KEY ([SOL_ID]) REFERENCES [SOLICITUDES] ([SOL_ID]),
        CONSTRAINT [FK_CHAT_WEB_SOLICITUDES_USW_ID] FOREIGN KEY ([USW_ID]) REFERENCES [SOLICITUDES] ([SOL_ID])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_CHAT_SOL_ID] ON [CHAT] ([SOL_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_CHAT_WEB_SOL_ID] ON [CHAT_WEB] ([SOL_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_CHAT_WEB_USW_ID] ON [CHAT_WEB] ([USW_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_MODELOS_MAR_ID] ON [MODELOS] ([MAR_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_SERVICIOS_SER_AGROUP_ID] ON [SERVICIOS] ([SER_AGROUP_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_SERVICIOS_X_SUCURSALES_SER_ID] ON [SERVICIOS_X_SUCURSALES] ([SER_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_SERVICIOS_X_SUCURSALES_SUC_ID] ON [SERVICIOS_X_SUCURSALES] ([SUC_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_SOLICITUDES_SER_ID] ON [SOLICITUDES] ([SER_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_SOLICITUDES_USU_ID] ON [SOLICITUDES] ([USU_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_SOLICITUDES_USW_ID] ON [SOLICITUDES] ([USW_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_VEHICULOS_MAR_ID] ON [VEHICULOS] ([MAR_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_VEHICULOS_MOD_ID] ON [VEHICULOS] ([MOD_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    CREATE INDEX [IX_VEHICULOS_USU_ID] ON [VEHICULOS] ([USU_ID]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221117163823_InitialMigrationV1')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221117163823_InitialMigrationV1', N'6.0.6');
END;
GO

COMMIT;
GO

