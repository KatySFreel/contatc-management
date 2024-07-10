<template>
	<TransitionGroup
		tag="ul"
		name="fade"
		class="contact-list"
	>
		<li
			v-for="contact in contacts"
			:key="contact.id"
			class="contact-list__item"
		>
			<ContactItem
				:contact="contact"
				@edit-contact="handleEditContact"
				@delete-contact="handleDeleteContact"
			/>
		</li>
	</TransitionGroup>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from 'vue';
	import { User } from '@/types';
	import ContactItem from './ContactItem.vue';

	const props = defineProps<{
		contacts: User[];
	}>();

	const emit = defineEmits<{
		(e: 'edit-contact', contact: User): void;
		(e: 'delete-contact', contact: User): void;
	}>();

	const handleEditContact = (contact: User) => {
		emit('edit-contact', contact);
	};

	const handleDeleteContact = (contact: User) => {
		emit('delete-contact', contact);
	};
</script>

<style lang="scss">
	.contact-list {
		@include media(md) {
			display: grid;
			align-items: stretch;
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
			grid-gap: 12px;
		}

		@include media(lg) {
			grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
			grid-gap: 20px;
		}
	}

	.contact-list__item {
		&:not(:last-child) {
			@include media(sm-max) {
				margin-bottom: 8px;
			}
		}
	}

	.fade-move,
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
		transform: scaleY(0.01) translate(30px, 0);
	}

	.fade-leave-active {
		position: absolute;
	}
</style>