<x-app-layout>
        <x-slot name="navigation">
            @include('layouts.navigation')
        </x-slot>
        <x-slot name="header">
            <h2 class="font-semibold text-xl text-white leading-tight">
                {{ __('You can\'t create a new Dumbot') }}
            </h2>
        </x-slot>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div role="alert" class="max-w-xl mx-auto">
                    <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        {{ __("You can't create another Dumbot") }}
                    </div>
                    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>{{ __("You reached the maximum number ($maxBots) of allowed bots by your subscription") }}</p>
                    </div>
                </div>
            </div>
        </div>
</x-app-layout>