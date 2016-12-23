::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Post deployment
:: ----------

:: SCM_POST_DEPLOYMENT_ACTIONS_PATH=post_deployment_actions=postdeploy.cmd
:: ARTIFACTS=%~dp0%..\artifacts
:: DEPLOYMENT_SOURCE=%~dp0%.
:: DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
echo Post deployment

setlocal

:: 1. Install development npm packages
IF EXIST "%DEPLOYMENT_TARGET%\package.json" (
  pushd "%DEPLOYMENT_TARGET%"
  call :ExecuteCmd !NPM_CMD! install --development
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)

:: 2. Run postdeploy npm script
echo Transpiling TypeScript in %DEPLOYMENT_TARGET%
pushd "%DEPLOYMENT_TARGET%"
call :ExecuteCmd !NPM_CMD! postdeploy
IF !ERRORLEVEL! NEQ 0 goto error
popd

:: 3. Copy DEPLOYMENTROOT_SOURCE folder to DEPLOYMENT_SOURCE
IF DEFINED DEPLOYMENTROOT_SOURCE (
  echo Copying files %DEPLOYMENTROOT_SOURCE% to %DEPLOYMENT_TARGET%
  xcopy %DEPLOYMENTROOT_SOURCE% %DEPLOYMENT_TARGET% /Y /S
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