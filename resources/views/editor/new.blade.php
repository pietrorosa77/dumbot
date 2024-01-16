<x-app-layout>
        <x-slot name="navigation">
            @include('layouts.navigation')
        </x-slot>
        <x-slot name="header">
            <h2 class="font-semibold text-xl text-white leading-tight">
                {{ __('Create new Dumbot') }}
            </h2>
        </x-slot>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="p-4 sm:p-8 bg-brand  sm:rounded-lg">
                    <div class="max-w-xl">
                        <section>
                            <header>
                                <h2 class="text-lg font-medium text-white">
                                    {{ __('Dumbot properties') }}
                                </h2>

                                <p class="mt-1 text-sm text-graydmbot-500">
                                    {{ __("Customize dumbot name or use the default provided") }}
                                </p>
                            </header>
                            <form method="post" action="{{ route('botEditor.store') }}" class="mt-6 space-y-6">
                                @csrf
                                <div>
                                    <x-input-label for="name" :value="__('Name')" />
                                    <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $dumbot->name)" required autofocus autocomplete="name" />
                                    <x-input-error class="mt-2" :messages="$errors->get('name')" />
                                </div>

                                <div class="flex items-center gap-4">
                                    <x-primary-button>{{ __('Save') }}</x-primary-button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
</x-app-layout>