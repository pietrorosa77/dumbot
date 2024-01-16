@props(['active'])

@php
$classes = ($active ?? false)
            ? 'block w-full ps-3 pe-4 py-2 border-l-4 border-cyan-400 text-start text-base font-medium text-cyan-400 bg-brand focus:text-cyan-800 focus:border-cyan-700 transition duration-150 ease-in-out'
            : 'block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-graydmbot-500 hover:text-white hover:bg-black hover:border-black focus:text-white focus:bg-black focus:border-black transition duration-150 ease-in-out';
@endphp

<a {{ $attributes->merge(['class' => $classes]) }}>
    {{ $slot }}
</a>
