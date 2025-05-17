import { useState } from 'react';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<'posts' | 'news' | 'media' | 'newsletter'>('posts');
  const [showModal, setShowModal] = useState(false);

  const sections = [
    { key: 'posts', label: 'Posty na blogu' },
    { key: 'news', label: 'Aktualności' },
    { key: 'media', label: 'Zdjęcia' },
    { key: 'newsletter', label: 'Newsletter' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 text-xl font-semibold">CMS Admin</div>
        <nav className="flex flex-col">
          {sections.map((s) => (
            <button
              key={s.key}
              className={`text-left px-4 py-2 hover:bg-gray-100 ${activeSection === s.key ? 'bg-gray-200' : ''}`}
              onClick={() => setActiveSection(s.key as any)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-white border-b">
          <h1 className="text-xl font-semibold">Panel Admina</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
          >
            Dodaj nowy
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4">
          {activeSection === 'posts' && <PostsSection />}
          {activeSection === 'news' && <NewsSection />}
          {activeSection === 'media' && <MediaSection />}
          {activeSection === 'newsletter' && <NewsletterSection />}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Nowy wpis</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">
                  Tytuł
                </label>
                <input
                  id="title"
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium">
                  Treść
                </label>
                <textarea
                  id="content"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium">
                  Zdjęcie
                </label>
                <input id="image" type="file" className="mt-1 block" />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Anuluj
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Zapisz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PostsSection() {
  const dummyPosts = [
    { id: 1, title: 'Przykładowy post', date: '2025-05-17' },
  ];
  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Tytuł</th>
            <th className="px-4 py-2 border">Data</th>
            <th className="px-4 py-2 border">Zarządzanie</th>
          </tr>
        </thead>
        <tbody>
          {dummyPosts.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-2 border">{p.id}</td>
              <td className="px-4 py-2 border">{p.title}</td>
              <td className="px-4 py-2 border">{p.date}</td>
              <td className="px-4 py-2 border space-x-2">
                <button className="px-2 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500">
                  Edytuj
                </button>
                <button className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Usuń
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NewsSection() {
  return <div>Sekcja aktualności (tabela, CRUD)</div>;
}

function MediaSection() {
  return <div>Sekcja zdjęć (siatka, upload, zarządzanie)</div>;
}

function NewsletterSection() {
  return <div>Sekcja newslettera (formularz ustawień, historie wysyłek)</div>;
}