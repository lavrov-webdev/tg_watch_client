<script lang="ts">
	import type { Message as TMessage } from '$lib/types';
	import _ from 'lodash';
	import { marked } from 'marked';
	import sanitizeHtml from 'sanitize-html';
	import { slide } from 'svelte/transition';
	import DiffView from './DiffView.svelte';
	import Modal from '../ui/Modal.svelte';
	import Text from '../ui/Text.svelte';
	import dayjs from 'dayjs';
	import { DATE_FORMAT } from '$lib/consts';
	type Props = {
		message: TMessage;
	};
	const { message }: Props = $props();
	const lastAction = $derived(message.history.at(-1));
	const previousAction = $derived(
		lastAction?.type === 'deleted' && message.history.length > 1 ? message.history.at(-2) : null
	);
	let toCompare = $state<string[]>([]);
	let expanded = $state(false);

	const toggleHistory = () => {
		expanded = !expanded;
	};

	const toggleToCompare = (id: string) => {
		toCompare = _.xor(toCompare, [id]);
	};

	const sortedTexts = $derived.by(() => {
		const first = message.history.find((h) => h.id === toCompare[0]);
		const second = message.history.find((h) => h.id === toCompare[1]);
		if (!first || !second) return { oldText: '', newText: '' };

		return new Date(first.date) < new Date(second.date)
			? { oldText: first.payload || '', newText: second.payload || '' }
			: { oldText: second.payload || '', newText: first.payload || '' };
	});

	const getMessageContent = (payload?: string) => {
		if (!payload) {
			return 'No content';
		}
		const htmlContent = marked.parse(payload, { async: false });
		return sanitizeHtml(htmlContent);
	};
</script>

<div class="message-content">
	<button onclick={toggleHistory} class="message-preview {lastAction?.type}">
		<span class="message-text">
			{#if lastAction?.type === 'deleted' && previousAction}
				<Text variant="body" color="muted">
					{@html getMessageContent(previousAction.payload)}
				</Text>
			{:else if !lastAction?.payload}
				<Text variant="body" italic={true} color="muted">No content</Text>
			{:else}
				<Text variant="body">
					{@html getMessageContent(lastAction.payload)}
				</Text>
			{/if}
		</span>
		<div class="history-count">{message.history.length}</div>
		<div class="message-date">
			<Text variant="small" color="muted" class="history-date">
				{dayjs(lastAction?.date).format(DATE_FORMAT)}
			</Text>
		</div>
	</button>
	{#if expanded && message.history.length > 1}
		<div class="message-history-container">
			<div class="connector"></div>
			<div transition:slide class="message-history">
				{#each message.history.slice().reverse() as action}
					<div class="history-item {action.type}">
						<div class="history-header">
							<Text variant="small" color="secondary" class="history-type">{action.type}</Text>
							{#if action.type !== 'deleted'}
								<button
									class={['diff-button', { 'to-compare': toCompare.includes(action.id) }]}
									onclick={() => toggleToCompare(action.id)}
								>
									Compare
								</button>
							{/if}
						</div>
						{#if action.type !== 'deleted'}
							<Text variant="body">
								{@html getMessageContent(action.payload)}
							</Text>
						{/if}
						<Text variant="small" color="muted" class="history-date">
							{dayjs(action.date).format(DATE_FORMAT)}
						</Text>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<Modal isOpen={toCompare.length === 2} onClose={() => (toCompare = [])}>
		<DiffView oldText={sortedTexts.oldText} newText={sortedTexts.newText} />
	</Modal>
</div>

<style>
	.message-content {
		display: block;
		margin-bottom: 12px;
		max-width: 70%;
		font-size: 15px;
		line-height: 1.4;
		color: #333;
		position: relative;

		:global {
			p {
				margin: 0;
				padding: 0;
			}
			a {
				color: #0088cc;
			}
		}

		.message-preview {
			width: 100%;
			border: 1px solid #e5e5e5;
			border-radius: 8px;
			transition: all 0.2s ease;
			cursor: pointer;
			position: relative;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;
			background: #ffffff;
			padding: 10px 14px;
			z-index: 2;

			&:hover {
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
			}

			&.deleted {
				background: #f8f8f8;
				border-color: #e0e0e0;
				color: #999;
			}

			.history-count {
				border: 1px solid rgba(95, 95, 95, 0.254);
				border-radius: 50%;
				padding-inline: 0.3em;
				font-size: 0.7rem;
			}

			.message-text {
				text-align: left;
				padding-right: 0.8em;
				max-width: 95%;
			}

			.message-date {
				width: 100%;
				min-width: 100px;
				margin-block-start: 1rem;
				text-align: left;
			}
		}

		.message-history-container {
			position: relative;
			margin-left: 20px;
		}

		.connector {
			position: absolute;
			left: -10px;
			top: -10px;
			bottom: 10px;
			width: 2px;
			background-color: #e5e5e5;
			z-index: 1;
		}

		.message-history {
			margin-top: 8px;
			padding: 8px 14px;
			border: 2px solid #e5e5e5;
			border-radius: 0 8px 8px 8px;
			position: relative;
			background-color: #fafafa;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

			.history-item {
				text-align: left;
				padding: 8px 0;
				border-bottom: 1px solid #f0f0f0;

				&:last-child {
					border-bottom: none;
				}

				.history-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 4px;
				}

				.diff-button {
					font-size: 0.75rem;
					padding: 3px 8px;
					background-color: #f0f0f0;
					border: 1px solid #ddd;
					border-radius: 4px;
					transition: all 0.2s;
					cursor: pointer;

					&:hover {
						background-color: #e0e0e0;
					}

					&.to-compare {
						background-color: #e6f7e6;
						border-color: #c3e6c3;
						color: #2e7d32;
					}
				}
			}
		}
	}
</style>
