<script lang="ts">
	import Message from '$lib/components/Message.svelte';

	const { data } = $props();
	const messages = $derived(data.chat?.messages || []);
</script>

<div class="chat-view">
	<div class="chat-header">
		<h2>{data.chat?.name}</h2>
	</div>
	<div class="messages-container">
		{#each messages as message (message.id)}
			<Message {message} />
		{/each}
	</div>
</div>

<style>
	.chat-view {
		flex: 1;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.chat-header {
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 10px;
	}
</style>
