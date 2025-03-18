<?php

use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\ServiceController;
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


Route::middleware(['auth', 'verified'])->prefix('dashboard/maintenance')->group(function () {
    Route::controller(ServiceCategoryController::class)->prefix('service-category')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.service-category');
        Route::post('/', 'store')->name('dashboard.maintenance.service-category.store');
        Route::patch('/{serviceCategory}', 'update')->name('dashboard.maintenance.service-category.update');
        Route::delete('/{serviceCategory}', 'destroy')->name('dashboard.maintenance.service-category.destroy');
    });

    Route::controller(ExpenseCategoryController::class)->prefix('expense-category')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.expense-category');
        Route::post('/', 'store')->name('dashboard.maintenance.expense-category.store');
        Route::patch('/{expenseCategory}', 'update')->name('dashboard.maintenance.expense-category.update');
        Route::delete('/{expenseCategory}', 'destroy')->name('dashboard.maintenance.expense-category.destroy');
    });

    Route::controller(BankAccountController::class)->prefix('bank-account')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.bank-account');
        Route::post('/', 'store')->name('dashboard.maintenance.bank-account.store');
        Route::patch('/{bankAccount}', 'update')->name('dashboard.maintenance.bank-account.update');
        Route::delete('/{bankAccount}', 'destroy')->name('dashboard.maintenance.bank-account.destroy');
    });

    Route::controller(ServiceController::class)->prefix('services')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.services');
        Route::post('/', 'store')->name('dashboard.maintenance.services.store');
        Route::patch('/{service}', 'update')->name('dashboard.maintenance.services.update');
        Route::delete('/{service}', 'destroy')->name('dashboard.maintenance.services.destroy');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
