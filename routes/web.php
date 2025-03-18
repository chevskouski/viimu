<?php

use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceCategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard/maintenance/service-category', [ServiceCategoryController::class, 'index'])
        ->name('dashboard.maintenance.service-category');
    Route::post('/dashboard/maintenance/service-category', [ServiceCategoryController::class, 'store'])
        ->name('dashboard.maintenance.service-category.store');
    Route::patch('/dashboard/maintenance/service-category/{serviceCategory}', [ServiceCategoryController::class, 'update'])
        ->name('dashboard.maintenance.service-category.update');
    Route::delete('/dashboard/maintenance/service-category/{serviceCategory}', [ServiceCategoryController::class, 'destroy'])
        ->name('dashboard.maintenance.service-category.destroy');
});

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard/maintenance/expense-category', [ExpenseCategoryController::class, 'index'])
        ->name('dashboard.maintenance.expense-category');
    Route::post('/dashboard/maintenance/expense-category', [ExpenseCategoryController::class, 'store'])
        ->name('dashboard.maintenance.expense-category.store');
    Route::patch('/dashboard/maintenance/expense-category/{expenseCategory}', [ExpenseCategoryController::class, 'update'])
        ->name('dashboard.maintenance.expense-category.update');
    Route::delete('/dashboard/maintenance/expense-category/{expenseCategory}', [ExpenseCategoryController::class, 'destroy'])
        ->name('dashboard.maintenance.expense-category.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
