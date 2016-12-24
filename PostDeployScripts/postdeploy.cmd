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

:: 1. Install development npm packages
for /d %%d in (..\wwwroot\*) do (
  pushd %%d

  if exist package.json (
    echo %%d npm install --development
    call npm install --development
  ) else (
    echo %%d no package.json found
  )

  popd
)

:: 2. Run postdeploy npm script
echo Run npm postdeploy script
for /d %%d in (..\wwwroot\*) do (
  pushd %%d

  if exist package.json (
    echo %%d npm run postdeploy
    call npm run postdeploy
  ) else (
    echo %%d no package.json found
  )

  popd
)

:: 3. Copy DEPLOYMENTROOT_SOURCE folder to DEPLOYMENT_SOURCE
rem IF DEFINED DEPLOYMENTROOT_SOURCE (
rem  echo Copying files %DEPLOYMENTROOT_SOURCE% to %DEPLOYMENT_TARGET%
rem  xcopy %DEPLOYMENTROOT_SOURCE% %DEPLOYMENT_TARGET% /Y /S
rem )

endlocal

echo record deployment timestamp
date /t >> ..\deployment.log
time /t >> ..\deployment.log
echo ---------------------- >> ..\deployment.log
echo Deployment done
