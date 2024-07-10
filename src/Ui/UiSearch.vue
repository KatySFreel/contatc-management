<template>
	<div
		:class="['ui-search', { 'ui-search--active': isActive }]"
		@click="activateSearch"
	>
		<svg
			class="ui-search__icon ui-search__icon--search"
			width="28"
			height="28"
			viewBox="0 0 28 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M22.1812 23L14.9189 15.7386C14.3391 16.2326 13.6722 16.6149 12.9184 16.8854C12.1646 17.156 11.4069 17.2913 10.6453 17.2913C8.78817 17.2913 7.21634 16.6485 5.92981 15.3629C4.64327 14.0773 4 12.506 4 10.6491C4 8.79223 4.64249 7.2202 5.92749 5.93305C7.21248 4.6459 8.78354 4.00155 10.6407 4C12.4978 3.99846 14.0704 4.64165 15.3585 5.92957C16.6466 7.2175 17.2906 8.78953 17.2906 10.6457C17.2906 11.4512 17.148 12.2308 16.8627 12.9846C16.5774 13.7383 16.2024 14.383 15.7377 14.9188L23 22.179L22.1812 23ZM10.6465 16.1305C12.185 16.1305 13.484 15.601 14.5432 14.5419C15.6024 13.4828 16.132 12.1837 16.132 10.6445C16.132 9.10532 15.6024 7.80657 14.5432 6.74825C13.484 5.68992 12.185 5.16037 10.6465 5.1596C9.10788 5.15883 7.80858 5.68838 6.74858 6.74825C5.68858 7.80812 5.15897 9.10687 5.15974 10.6445C5.16051 12.1821 5.69013 13.4809 6.74858 14.5407C7.80704 15.6006 9.10594 16.1302 10.6453 16.1294" fill="currentColor"/>
		</svg>

		<input
			type="text"
			placeholder="Поиск"
			class="ui-search__input"
			v-model="searchQuery"
			@input="emitSearch"
			@focus="isActive = true"
			@blur="isActive = false"
		>

		<button
			type="button"
			class="ui-search__icon ui-search__icon--close"
			@click.stop="clearSearch"
		>
			<svg
				width="28"
				height="28"
				viewBox="0 0 28 28"
				fill="none" xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M8.16699 8.1665L19.8337 19.8332M8.16699 19.8332L19.8337 8.1665" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineEmits, defineProps, watch } from 'vue';

	const props = defineProps<{ modelValue: string }>();

	const isActive = ref(false);
	const searchQuery = ref(props.modelValue);
	const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

	const activateSearch = () => {
		isActive.value = true;
	};

	const clearSearch = () => {
		searchQuery.value = '';
		emitSearch();
	};

	const emitSearch = () => {
		emit('update:modelValue', searchQuery.value);
	};

	watch(() => props.modelValue, (newValue) => {
		searchQuery.value = newValue;
	});
</script>

<style lang="scss">
	.ui-search {
		background-color: var(--grey-light-color);
		border-radius: var(--border-radius-max);
		width: 100%;
		padding: 8px 12px;
		column-gap: 12px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		cursor: pointer;
		transition: all .3s ease-in-out;

		@include media(md) {
			max-width: 353px;
			padding: 12px 16px;
		}

		&:focus-within,
		&:hover {
			.ui-search__icon {
				color: var(--grey-dark-color);

				&--close {
					opacity: 1;

					&:focus,
					&:hover {
						opacity: .5;
					}
				}
			}
		}
	}

	.ui-search__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--grey-dark-color);
		transition: var(--transition);

		&--close {
			opacity: 0;
		}
	}

	.ui-search__input {
		width: 100%;
	}
</style>
