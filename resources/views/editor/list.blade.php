<div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
    @if (!$hasBots)
        <div role="alert" class="max-w-xl mx-auto">
            <div class="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
                {{ __("You don't have any Dumbot yet") }}
            </div>
            <div class="border border-t-0 border-blue-500 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
                <p>{{ __('Start now ') }}<a class="font-medium text-blue-600 hover:underline"
                        href="{{ route('botEditor.edit') }}">{{ _('adding a new one!!') }}</a></p>

            </div>
        </div>
    @else
        <div class="bg-brand overflow-hidden sm:rounded-lg border border-accent ">
            <div class="p-6 text-white relative overflow-x-auto">
                @foreach ($bots as $bot)
                    <div
                        class="flex bg-bars border-2 rounded-lg py-4 mb-3 flex-nowrap px-2 hover:border-accent items-center">
                        <div class="flex-1 flex-nowrap">
                            <strong>{{ $bot->name }}</strong>
                            <div class='flex space-x-2'>
                                <div class="text-xs mb-1">
                                    <span class="opacity-75">created: <strong>{{ $bot->created_at }}</strong></span>
                                </div>
                                <div class="text-xs">
                                    <span class="opacity-75">updated: <strong>{{ $bot->updated_at }}</strong></span>
                                </div>
                            </div>
                        </div>
                        <div class="flex space-x-4 flex-nowrap">
                            <a href="{{ route('botEditor.edit', ['botkey' => $bot->id]) }}"
                                class="text-white w-full inline-flex items-center justify-center bg-brand hover:bg-accent hover:text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg aria-hidden="true" class="mr-1 -ml-1 w-5 h-5" fill="currentColor"
                                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clip-rule="evenodd" />
                                </svg>
                                {{ __('Edit') }}
                            </a>
                            <button type="button" x-data="{ botKey: '{{ $bot->id }}' }"
                                x-on:click.prevent="$dispatch('open-modal', {name: 'confirm-bot-deletion', botKey})"
                                x-bind:disabled="$store.dumbotDashboard.isBlocking"
                                class="disabled:bg-gray-500 disabled:opacity-75 inline-flex w-full items-center text-white justify-center bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor"
                                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                                </svg>
                                {{ __('Delete') }}
                            </button>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
        <x-modal name="confirm-bot-deletion" focusable>
            <div class="p-6">

                <h2 class="text-lg font-medium text-white">
                    {{ __('Are you sure you want to delete this Dumbot?') }}
                </h2>

                <p class="mt-1 text-sm text-graydmbot-500">
                    {{ __('Once deleted, all the applications referencing it will display a "dumbot not found" error. Please confirm you would like to permanently delete it.') }}
                </p>

                <div class="mt-6 flex justify-end space-x-4">
                    <x-secondary-button  x-on:click="$dispatch('close')">
                        {{ __('Cancel') }}
                    </x-secondary-button>

                    <button x-data="" type="button"
                        x-on:click="$dispatch('close');document.dispatchEvent(new CustomEvent('deleteBot', { bubbles: true, detail: {botId: $data.extraParams.botKey, deleteBtn:$el, holderId: $refs.myDumbotsListHolder }}))"
                        class="inline-flex items-center text-white justify-center bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <svg aria-hidden="true" class="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewbox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                        </svg>
                        {{ __('Delete') }}
                    </button>
                </div>
            </div>
        </x-modal>
    @endif
</div>
