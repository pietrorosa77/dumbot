@props(['disabled' => false])

<input {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge(['class' => 'border-black focus:border-cyan-500 focus:ring-cyan-500 rounded-md shadow-sm']) !!}>
