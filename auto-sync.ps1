# ============================================
# JL PERSONAL WEBSITE - GITHUB AUTO SYNC
# ============================================

$ProjectFolder = $PSScriptRoot
$SyncInterval = 30

Set-Location $ProjectFolder

Write-Host ""
Write-Host "============================================"
Write-Host "   JL PERSONAL WEBSITE - GITHUB AUTO SYNC"
Write-Host "============================================"
Write-Host ""

# Check Git
git --version

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git is not installed." -ForegroundColor Red
    exit
}

# Check repository
$InsideGitRepo = git rev-parse --is-inside-work-tree 2>$null

if ($InsideGitRepo -ne "true") {
    Write-Host "This folder is not a Git repository." -ForegroundColor Red
    exit
}

# Get current branch
$Branch = git branch --show-current

if ([string]::IsNullOrWhiteSpace($Branch)) {
    $Branch = "main"
}

Write-Host ""
Write-Host "Project:" $ProjectFolder
Write-Host "Branch:" $Branch
Write-Host "Auto-sync interval:" $SyncInterval "seconds"
Write-Host ""
Write-Host "Auto Sync is ACTIVE." -ForegroundColor Green
Write-Host "Keep this terminal open while coding."
Write-Host "Press CTRL + C to stop Auto Sync."
Write-Host ""

while ($true) {

    Start-Sleep -Seconds $SyncInterval

    $Changes = git status --porcelain

    if ($Changes) {

        Write-Host ""
        Write-Host "--------------------------------------------"
        Write-Host "Changes detected..." -ForegroundColor Yellow
        Write-Host "--------------------------------------------"

        git add -A

        $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

        git commit -m "Auto sync: $Timestamp"

        if ($LASTEXITCODE -eq 0) {

            Write-Host ""
            Write-Host "Checking GitHub for newer changes..."

            git pull --rebase origin $Branch

            if ($LASTEXITCODE -eq 0) {

                Write-Host ""
                Write-Host "Uploading changes to GitHub..." -ForegroundColor Cyan

                git push origin $Branch

                if ($LASTEXITCODE -eq 0) {
                    Write-Host ""
                    Write-Host "GitHub successfully updated!" -ForegroundColor Green
                    Write-Host "Synced at:" (Get-Date -Format "hh:mm:ss tt")
                }
                else {
                    Write-Host ""
                    Write-Host "GitHub push failed." -ForegroundColor Red
                }
            }
            else {
                Write-Host ""
                Write-Host "Could not pull latest GitHub changes." -ForegroundColor Red
            }
        }

        Write-Host ""
        Write-Host "Watching for more changes..."
    }
}