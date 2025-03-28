<script lang="ts">
	import ChatSidebar from '$lib/components/chat/ChatSidebar.svelte';
	const { data, children } = $props();
</script>

<div class="layout-container">
	<ChatSidebar chats={data.chats || []} selectedChat={data.chatId} />
	<main>
		{@render children()}
	</main>
</div>

<style>
	.layout-container {
		display: flex;
		height: 100vh;
		padding-inline: 8px;
	}

	main {
		flex: 1;
		overflow: auto;
	}
</style>
