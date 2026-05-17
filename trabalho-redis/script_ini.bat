@echo off
setlocal

echo ============================================
echo   Iniciando projeto - Frontend e Backend
echo ============================================

if exist ".initialized" (
    echo [INFO] Dependencias ja instaladas. Pulando setup...
    goto START_SERVERS
)

echo.
echo [SETUP] Primeira execucao detectada. Instalando dependencias...
echo.

:: --- Frontend ---
echo [FRONTEND] Instalando pacotes npm...
cd frontend

call npm install
if errorlevel 1 (
    echo [ERRO] npm install falhou. Abortando.
    pause
    exit /b 1
)

cd ..

:: --- Backend ---
echo.
echo [BACKEND] Criando ambiente virtual Python...
cd backend

python -m venv venv
if errorlevel 1 (
    echo [ERRO] Falha ao criar venv. Verifique se Python esta instalado.
    pause
    exit /b 1
)

echo [BACKEND] Ativando venv e instalando dependencias...
call venv\Scripts\activate.bat

pip install -r requirements.txt
if errorlevel 1 (
    echo [ERRO] pip install falhou. Verifique o requirements.txt.
    pause
    exit /b 1
)

call venv\Scripts\deactivate.bat
cd ..

:: Log de inicialização
echo Setup concluido em %DATE% %TIME% > .initialized
echo.
echo [SETUP] Dependencias instaladas com sucesso!

:START_SERVERS
echo.
echo [INFO] Iniciando servidores...
echo.

:: Inicia o front
start "Frontend - Vite" cmd /k "cd frontend && npm run dev"

:: Abre terminal com venv já ativado
start "Backend - Uvicorn" cmd /k "cd backend && call venv\Scripts\activate.bat && uvicorn app.main:app --reload"

echo [OK] Frontend e Backend iniciados em janelas separadas.
echo.
echo Pressione qualquer tecla para encerrar os servidores e fechar os terminais...
pause >nul

echo.
echo [INFO] Encerrando servidores...

:: Vai encerrar os processos que tenham os nomes especificados
taskkill /FI "WINDOWTITLE eq Frontend - Vite" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Backend - Uvicorn" /T /F >nul 2>&1


echo [OK] Servidores encerrados. Ate logo!
timeout /t 2 >nul
endlocal