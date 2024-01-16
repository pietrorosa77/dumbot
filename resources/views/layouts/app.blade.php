<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Dumbot') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
</head>

<body class="font-sans antialiased">
    <div class="min-h-screen bg-bars">
        @if (isset($navigation))
            {{ $navigation }}
        @endif

        <!-- Page Heading -->
        @if (isset($header))
            <header class="bg-brand shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {{ $header }}
                </div>
            </header>
        @endif

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
    </div>
    {{-- <ul x-data="">
        <template x-for="toast in $store.dumbotDashboard.toasts" :key="toast.id">
            <li x-text="toast.type"></li>
        </template>
    </ul>
     --}}
</body>

</html>