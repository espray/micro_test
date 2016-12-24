@if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Post deployment
:: ----------

:: SCM_POST_DEPLOYMENT_ACTIONS_PATH=PostDeployScripts
:: ARTIFACTS=%~dp0%..\artifacts
:: DEPLOYMENT_SOURCE=%~dp0%.
:: DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot

echo Post deployment

setlocal

:: 1. Copy DEPLOYMENTROOT_SOURCE folder to DEPLOYMENT_SOURCE
IF DEFINED DEPLOYMENTROOT_SOURCE (
  echo Copying files %DEPLOYMENTROOT_SOURCE% to %DEPLOYMENT_TARGET%
  xcopy %DEPLOYMENTROOT_SOURCE% %DEPLOYMENT_TARGET% /Y /S /Q
)

:: 2. Install development npm packages
echo ===================================================================
IF EXIST "%DEPLOYMENT_TARGET%\package.json" (
  pushd "%DEPLOYMENT_TARGET%"
  echo %DEPLOYMENT_TARGET%\package.json found

  echo ===================================================================
  echo %DEPLOYMENT_TARGET% npm install
  call :ExecuteCmd NPM_CMD install
  IF !ERRORLEVEL! NEQ 0 goto error

  echo ===================================================================
  echo %DEPLOYMENT_TARGET% npm run postdeploy
  REM call :ExecuteCmd npm run postdeploy
  REM IF !ERRORLEVEL! NEQ 0 goto error

  echo ===================================================================
  echo %DEPLOYMENT_TARGET% npm run test
  REM call  :ExecuteCmd npm run test
  REM IF !ERRORLEVEL! NEQ 0 goto error

  popd
) ELSE (
  echo no %DEPLOYMENT_TARGET%\package.json found
  echo ===================================================================
)

goto end

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:: Execute command routine that will echo out when error
:ExecuteCmd
setlocal
set _CMD_=%*
call %_CMD_%
if "%ERRORLEVEL%" NEQ "0" echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
exit /b %ERRORLEVEL%

:error
endlocal
echo An error has occurred during web site deployment.
call :exitSetErrorLevel
call :exitFromFunction 2>nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal

echo Finished post deploy successfully.
