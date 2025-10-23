import React from 'react';
import { QueryClient, dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

// export const metadata: Metadata = { title: 'Notes — NoteHub' };

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () => fetchNotes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

// import css from './App.module.css';
// import NoteList from '@/components/NoteList/NoteList';
// import Pagination from '@/components/Pagination/Pagination';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import { useState } from 'react';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { fetchNotes } from '@/lib/api';
// import NoteForm from '@/components/NoteForm/NoteForm';
// import { useDebounce } from 'use-debounce';
// import Modal from '@/components/Modal/Modal';
// import { Loader } from '@/components/Loader/Loader';
// import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

// export default function App() {
//   const [query, setQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [debouncedQuery] = useDebounce(query, 500);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['notes', debouncedQuery, page],
//     queryFn: () => fetchNotes(debouncedQuery, page),
//     placeholderData: keepPreviousData,
//   });

//   const handleSearch = (newQuery: string) => {
//     setQuery(newQuery);
//     setPage(1);
//   };

//   const toggleModal = () => {
//     setIsModalOpen((prev) => !prev);
//   };

//   const totalPages = data?.totalPages ?? 0;
//   const notes = data?.notes ?? [];

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={query} onSearch={handleSearch} />
//         {totalPages > 1 && (
//           <Pagination
//             totalPages={totalPages}
//             currentPage={page}
//             onPageChange={setPage}
//           />
//         )}
//         <button
//           className={css.button}
//           onClick={() => {
//             toggleModal();
//           }}
//         >
//           Create note +
//         </button>
//       </header>

//       {isLoading && <Loader />}
//       {isError && <ErrorMessage />}

//       {notes.length > 0 && <NoteList notes={notes} />}

//       {isModalOpen && (
//         <Modal onClose={toggleModal}>
//           <NoteForm onClose={toggleModal} />
//         </Modal>
//       )}
//     </div>
//   );
// }
