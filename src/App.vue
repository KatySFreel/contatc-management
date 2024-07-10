<template>
	<div class="container">
		<header class="header">
			<div class="header__wrapper">
				<h1 class="header__title h h--1 f f--7">
					Управление контактами
				</h1>

				<UiButton
					theme="primary"
					type="button"
					@click="showAddModal = true"
				>
					Добавить контакт
				</UiButton>

				<UiSearch v-model="searchQuery" />
			</div>
		</header>

		<main class="main">
			<p class="main__text f f--5">
				Всего контактов {{ filteredContacts.length }}
			</p>

			<section class="main__content">
				<ContactList
					:contacts="filteredContacts"
					@edit-contact="editContact"
					@delete-contact="confirmDeleteContact"
				/>
			</section>
		</main>

		<UiModal
			:isVisible="showAddModal"
			@ui-modal-close="showAddModal = false"
		>
			<UiForm
				:isEditMode="false"
				@submit="addContact"
				@cancel="showAddModal = false"
			/>
		</UiModal>

		<UiModal
			:isVisible="showEditModal"
			@ui-modal-close="showEditModal = false"
		>
			<UiForm
				:isEditMode="true"
				:contact="currentContact"
				@submit="updateContact"
				@cancel="showEditModal = false"
			/>
		</UiModal>

		<UiModal
			:isVisible="showDeleteModal"
			@ui-modal-close="showDeleteModal = false"
		>
			<div class="contact-item-remove-modal__wrapper">
				<h3 class="contact-item-remove-modal__title h h--2 f f--5">
					Вы уверены, что хотите удалить этот контакт?
				</h3>

				<UiButton
					theme="primary"
					type="button"
					@click="deleteContact"
				>
					Да
				</UiButton>

				<UiButton
					theme="secondary"
					type="button"
					@click="showDeleteModal = false"
				>
					Нет
				</UiButton>
			</div>
		</UiModal>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, watchEffect } from 'vue';
	import { User } from "@/types";
	import mockData from "@/mocks";

	import ContactList from "@/components/Contact/ContactList.vue";
	import UiSearch from "@/Ui/UiSearch.vue";
	import UiModal from "@/Ui/UiModal.vue";
	import UiForm from "@/Ui/UiForm.vue";
	import UiButton from "@/Ui/UiButton.vue";

	const LOCAL_STORAGE_KEY = 'contacts';

	const showAddModal = ref(false);
	const showEditModal = ref(false);
	const showDeleteModal = ref(false);
	const searchQuery = ref('');
	const currentContact = ref<User | null>(null);
	const contactToDelete = ref<User | null>(null);
	const contacts = ref<User[]>(loadContacts());

	// Загрузка контактов из локального хранилища с обработкой ошибока
	function loadContacts(): User[] {
		const savedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
		return savedContacts ? JSON.parse(savedContacts) : mockData;
	}

	// Сохранение контактов в локальное хранилище с обработкой ошибок
	function saveContacts() {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts.value));
	}

	// Функция фильтрации контактов
	const filteredContacts = computed(() => {
		if (!searchQuery.value) {
			return contacts.value;
		}

		const query = searchQuery.value.toLowerCase();

		return contacts.value.filter(contact =>
			contact.name.toLowerCase().includes(query) ||
			contact.phone.toLowerCase().includes(query) ||
			contact.email.toLowerCase().includes(query)
		);
	});

	// Добавление нового контакта
	const addContact = (newContact: User) => {
		contacts.value.push({ ...newContact, id: Date.now() });
		saveContacts();
		showAddModal.value = false;
	};

	// Обновление существующего контакта
	const updateContact = (updatedContact: User) => {
		const index = contacts.value.findIndex(contact => contact.id === updatedContact.id);

		if (index !== -1) {
			contacts.value[index] = updatedContact;
		}

		saveContacts();
		showEditModal.value = false;
	};

	// Подтверждение удаления контакта
	const confirmDeleteContact = (contact: User) => {
		contactToDelete.value = contact;
		showDeleteModal.value = true;
	};

	// Удаление контакта
	const deleteContact = () => {
		if (contactToDelete.value) {
			contacts.value = contacts.value.filter(contact => contact.id !== contactToDelete.value!.id);
		}

		saveContacts();
		showDeleteModal.value = false;
	};

	// Редактирование контакта
	const editContact = (contact: User) => {
		currentContact.value = contact;
		showEditModal.value = true;
	};

	// Автоматическое сохранение контактов при изменении
	watchEffect(() => {
		saveContacts();
	});
</script>

<style lang="scss">
	.header__wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 20px;
		gap: 16px;

		@include media(md) {
			display: grid;
			justify-content: space-between;
			align-items: center;
			grid-template-columns: 1fr auto auto;
			gap: 20px;
		}
	}

	.main__text {
		margin-bottom: 20px;
	}
</style>
