<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DumbotController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DumbotController::class, 'index'])->name('dashboard');
    Route::get('/botEditor/{botkey?}', [DumbotController::class, 'edit'])->name('botEditor.edit');
    Route::post('/botEditor', [DumbotController::class, 'store'])->name('botEditor.store');
    Route::patch('/botEditor/{bot}', [DumbotController::class, 'update'])->name('botEditor.update');
    Route::delete('/botEditor/{botkey}', [DumbotController::class, 'destroy'])->name('botEditor.destroy');
});

require __DIR__.'/auth.php';
