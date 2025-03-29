<script lang="ts">
	import type { Chat } from '$lib/types';
	import Text from '../ui/Text.svelte';
	import { onMount } from 'svelte';

	type Props = {
		chats: Chat[];
		selectedChat?: string;
	};

	const { selectedChat, chats }: Props = $props();
	
	let isCollapsed = $state(false);
	
	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}
	
	onMount(() => {
		const savedState = localStorage.getItem('sidebarCollapsed');
		if (savedState) {
			isCollapsed = savedState === 'true';
		}
	});
	
	$effect(() => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('sidebarCollapsed', String(isCollapsed));
		}
	});
</script>

<div class="chat-list" class:collapsed={isCollapsed}>
	<button class="toggle-button" onclick={toggleSidebar} title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
		<span class="toggle-icon">{isCollapsed ? '→' : '←'}</span>
	</button>
	{#if chats.length === 0}
		<div class="no-chats">
			<div class="no-chats-icon">📭</div>
			<Text variant="h5" align="center">No chats available</Text>
			<Text variant="caption" color="muted" align="center">There are no chats to display at the moment</Text>
		</div>
	{:else}
		{#each chats as chat}
			<a
				class="chat-item"
				type="button"
				tabindex="0"
				data-selected={selectedChat === chat.id}
				href="/{chat.id}"
			>
				<div class="avatar">
					<div class="avatar-placeholder">{chat.name.charAt(0)}</div>
				</div>
				<div class="chat-content" class:hidden={isCollapsed}>
					<div class="chat-header">
						<Text variant="body" weight="medium" truncate={true} class="chat-name">{chat.name}</Text>
					</div>
					<div class="chat-preview"></div>
				</div>
			</a>
		{/each}
	{/if}
</div>

<style>
	.chat-list {
		width: 100%;
		max-width: 400px;
		height: 100vh;
		overflow-y: auto;
		border-right: 1px solid #f0f0f0;
		position: relative;
		transition: max-width 0.3s ease;
	}
	
	.chat-list.collapsed {
		max-width: 80px;
	}
	
	.toggle-button {
		position: sticky;
		top: 10px;
		float: right;
		margin-right: 10px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #f0f0f0;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 10;
		transition: background-color 0.2s;
	}
	
	.toggle-button:hover {
		background-color: #e0e0e0;
	}
	
	.toggle-icon {
		font-size: 14px;
	}

	.no-chats {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 20px;
		text-align: center;
		color: #666;
	}

	.no-chats-icon {
		font-size: 48px;
		margin-bottom: 16px;
	}

	.no-chats :global(.text) {
		margin: 5px 0;
	}

	a.chat-item {
		display: flex;
		padding: 10px 15px;
		border-bottom: 1px solid #f0f0f0;
		cursor: pointer;
		transition: background-color 0.2s;
		background: none;
		border: none;
		width: 100%;
		text-align: left;
	}
	
	.chat-list.collapsed a.chat-item {
		justify-content: center;
		padding: 10px 5px;
	}

	a.chat-item[data-selected='true'] {
		background-color: #e6f2ff;
	}

	a.chat-item[data-selected='true']:hover {
		background-color: #d9e9ff;
	}

	a.chat-item:not([data-selected='true']):hover {
		background-color: #f5f5f5;
	}

	.avatar {
		margin-right: 12px;
		transition: margin 0.3s ease;
	}
	
	.chat-list.collapsed .avatar {
		margin-right: 0;
	}

	.avatar-placeholder {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #0088cc;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		font-weight: bold;
	}

	.chat-content {
		flex: 1;
		min-width: 0;
		transition: opacity 0.2s ease;
	}
	
	.chat-content.hidden {
		opacity: 0;
		width: 0;
		overflow: hidden;
	}

	.chat-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.chat-preview {
		display: flex;
		justify-content: space-between;
	}
</style>
