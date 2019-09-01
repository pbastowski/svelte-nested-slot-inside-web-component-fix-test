<script>
    import Input from './Input.svelte'
    const dispatch = require('svelte').createEventDispatcher()

    export let abc
    export let hello

    function emit(el, name, detail) {
        el.dispatchEvent(
            new Event(name, {
                detail,
                bubbles: true,
                composed: true
            })
        )
    }
    let text = 'testing'
    let initialised = false

    /**
     * When compiling to a web component target, we must use a custom
     * onLoad handler to retrieve the props. That's because they are not
     * yet available when the component instance is created or in the
     * onMount callback.
     **/

    console.log('$$props: instance created:', 'abc=', abc, 'hello=', hello)
    function onLoad(ev) {
        console.log(
            '$$props: custom onLoad handler:',
            'abc=',
            abc,
            'hello=',
            hello
        )
        initialised = true
    }
</script>

<!--<svelte:options tag="my-thing" />-->

<!--
    We can prevent content from rendering until we have finished initialising
    our data by using a flag like initialised. For web component targets, this
    flag is set in the custom onLoad handler, see above.
    For Svelte apps you would initialise this flag in the onMount callback.
-->
<h1>Testing Svelte slots</h1>
<p>
    This svelte app is wrapped in a web-component, which passes props
    <b>abc</b>
    and
    <b>hello</b>
    to the app, as well as some slot content.
</p>

<hr />
<h4>Slot content from Index.html</h4>
<slot />

<hr />
<h4>Props passed in from index.html:</h4>
<pre>
    <b>abc:</b>
    {abc}
</pre>
<pre>
    <b>hello</b>
    : {hello}
</pre>

<hr />

<!--
    Events dispatched with Svelte using createEventDispatcher() can not
    be handled with normal javascript event handling. That is
    `element.addEventListener('svelte-event', handler)` and
    `<element onsvelte-event="handler()">` will NOT work.
    Instead you have to use `element.$on('svelte-event', handler)`.
    See index.html for an example.

    Events dispatched with element.dispatchEvent(new Event('custom'))
    can be only be handled in JavaScript using
    `element.addEventListener('custom', handler)`.
    See index.html for an example.
    -->

<h4>Nested Input component with a slot of it's own:</h4>
<p>
    <i>The "slotted" label, below, does not render at all without PR #3136</i>
</p>
<Input
    on:click={e => {
        dispatch('svelte-event')
        emit(e.target, 'custom')
    }}
    bind:value={text}>
    Label goes here
</Input>

<pre>text: {text}</pre>
