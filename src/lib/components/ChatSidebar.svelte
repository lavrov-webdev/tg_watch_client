<script lang="ts">
	import type { Chat } from '$lib/types';

	type Props = {
		chats: Chat[];
		selectedChat?: string;
	};

	const { selectedChat, chats }: Props = $props();
</script>

<div class="chat-list">
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
			<div class="chat-content">
				<div class="chat-header">
					<span class="chat-name">{chat.name}</span>
				</div>
				<div class="chat-preview"></div>
			</div>
		</a>
	{/each}
</div>

<style>
	.chat-list {
		width: 100%;
		max-width: 400px;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		height: 100vh;
		overflow-y: auto;
		border-right: 1px solid #f0f0f0;
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

	/* 1. Нет ховер, чат не выбран - базовый стиль */

	/* 2. Нет ховер, чат выбран */
	a.chat-item[data-selected='true'] {
		background-color: #e6f2ff;
	}

	/* 3. Есть ховер, чат выбран */
	a.chat-item[data-selected='true']:hover {
		background-color: #d9e9ff;
	}

	/* 4. Есть ховер, чат не выбран */
	a.chat-item:not([data-selected='true']):hover {
		background-color: #f5f5f5;
	}

	.avatar {
		margin-right: 12px;
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
	}

	.chat-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.chat-name {
		font-weight: 500;
		font-size: 16px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.chat-preview {
		display: flex;
		justify-content: space-between;
	}
</style>
