<x-app-layout>
    <x-slot name="navigation">
        @include('layouts.navigation')
    </x-slot>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-white leading-tight">
            {{ __('My Dumbots') }}
        </h2>
    </x-slot>

    <div class="py-12" x-data='' x-ref="myDumbotsListHolder">
        @include('editor.list')
    </div>
</x-app-layout>
