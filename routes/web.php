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
    Route::controller(ServiceCategoryController::class)->prefix('service-categories')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.service-categories');
        Route::post('/', 'store')->name('dashboard.maintenance.service-categories.store');
        Route::patch('/{id}', 'update')->name('dashboard.maintenance.service-categories.update');
        Route::delete('/{id}', 'destroy')->name('dashboard.maintenance.service-categories.destroy');
    });

    Route::controller(ExpenseCategoryController::class)->prefix('expense-categories')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.expense-categories');
        Route::post('/', 'store')->name('dashboard.maintenance.expense-categories.store');
        Route::patch('/{id}', 'update')->name('dashboard.maintenance.expense-categories.update');
        Route::delete('/{id}', 'destroy')->name('dashboard.maintenance.expense-categories.destroy');
    });

    Route::controller(BankAccountController::class)->prefix('bank-accounts')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.bank-accounts');
        Route::post('/', 'store')->name('dashboard.maintenance.bank-accounts.store');
        Route::patch('/{id}', 'update')->name('dashboard.maintenance.bank-accounts.update');
        Route::delete('/{id}', 'destroy')->name('dashboard.maintenance.bank-accounts.destroy');
    });

    Route::controller(ServiceController::class)->prefix('services')->group(function () {
        Route::get('/', 'index')->name('dashboard.maintenance.services');
        Route::post('/', 'store')->name('dashboard.maintenance.services.store');
        Route::patch('/{id}', 'update')->name('dashboard.maintenance.services.update');
        Route::delete('/{id}', 'destroy')->name('dashboard.maintenance.services.destroy');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
