"use client";

import { useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { PanelShell } from "./PanelShell";
import { PlaceholderScreen } from "./PlaceholderScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { PagesScreen } from "./screens/PagesScreen";
import { PageEditorScreen } from "./screens/PageEditorScreen";
import { SeriesScreen } from "./screens/SeriesScreen";
import { BlogListScreen } from "./screens/BlogListScreen";
import { PostEditorScreen } from "./screens/PostEditorScreen";
import { LeadsScreen } from "./screens/LeadsScreen";
import { UsersScreen } from "./screens/UsersScreen";
import { FilesScreen } from "./screens/FilesScreen";
import { GlobalDataScreen, defaultGlobalData } from "./screens/GlobalDataScreen";
import type { GlobalData } from "./screens/GlobalDataScreen";
import { defaultPageStatus, pageMeta } from "./pageMeta";
import type { PageName, PageStatus } from "./pageMeta";
import { pageContentSchema, defaultSeries } from "./pageContentSchema";
import { defaultBlogPosts, newBlogPost } from "./blogPosts";
import type { BlogPost } from "./blogPosts";
import type { Lang, Screen } from "./types";

type BlogFilter = "Todas" | "Publicadas" | "Borradores";

function collectRepeaterDefaults(): Record<string, string[][]> {
  const defaults: Record<string, string[][]> = {};
  for (const tabs of Object.values(pageContentSchema)) {
    for (const groups of Object.values(tabs)) {
      for (const group of groups) {
        if (group.repeater) defaults[group.repeater.name] = group.repeater.defaultRows.map((r) => [...r]);
      }
    }
  }
  return defaults;
}

const crumbs: Record<Screen, string> = {
  dashboard: "Panel de contenido",
  pages: "Páginas",
  pageEditor: "Editar página",
  series: "Series de rendimientos",
  blogList: "Blog",
  postEditor: "Editar publicación",
  leads: "Solicitudes",
  usuarios: "Usuarios",
  archivos: "Archivos",
  datos: "Datos globales",
};

const screenTitles: Record<Screen, string> = {
  dashboard: "Panel de contenido",
  pages: "Páginas",
  pageEditor: "Editor de página",
  series: "Series de rendimientos",
  blogList: "Blog",
  postEditor: "Editor de publicación",
  leads: "Solicitudes",
  usuarios: "Usuarios",
  archivos: "Archivos",
  datos: "Datos globales",
};

export function PanelApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [lang, setLang] = useState<Lang>("ES");
  const [pageStatus, setPageStatus] = useState<Record<PageName, PageStatus>>(defaultPageStatus);
  const [currentPage, setCurrentPage] = useState<PageName>("Home");
  const [currentTab, setCurrentTab] = useState<string>("Portada");
  const [contentValues, setContentValues] = useState<Record<string, string | boolean>>({});
  const [repeaterRows, setRepeaterRows] = useState<Record<string, string[][]>>(collectRepeaterDefaults);
  const [seriesData, setSeriesData] = useState<[number, number, number][]>(() => defaultSeries.map((r) => [...r] as [number, number, number]));
  const [savedNote, setSavedNote] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [postFilter, setPostFilter] = useState<BlogFilter>("Todas");
  const [editingPostIndex, setEditingPostIndex] = useState<number | null>(null);
  const [globalData, setGlobalData] = useState<GlobalData>(defaultGlobalData);

  const handleNavigate = (next: Screen, page?: PageName) => {
    if (page) {
      setCurrentPage(page);
      setCurrentTab(pageMeta[page].tabs[0]);
    }
    setScreen(next);
  };

  const handleTogglePage = (page: PageName) => {
    setPageStatus((prev) => ({
      ...prev,
      [page]: prev[page] === "Publicada" ? "En construcción" : "Publicada",
    }));
  };

  const handleFieldChange = (page: PageName, tab: string, key: string, value: string | boolean) => {
    setContentValues((prev) => ({ ...prev, [`${page}|${tab}|${key}`]: value }));
  };

  const handleRepeaterCellChange = (name: string, rowIdx: number, colIdx: number, value: string) => {
    setRepeaterRows((prev) => {
      const rows = (prev[name] ?? []).map((r) => [...r]);
      rows[rowIdx][colIdx] = value;
      return { ...prev, [name]: rows };
    });
  };

  const handleAddRepeaterRow = (name: string, cols: number) => {
    setRepeaterRows((prev) => ({
      ...prev,
      [name]: [...(prev[name] ?? []), Array.from({ length: cols }, () => "")],
    }));
  };

  const handleSeriesCellChange = (rowIdx: number, col: 1 | 2, value: number) => {
    setSeriesData((prev) => {
      const rows = prev.map((r) => [...r]) as [number, number, number][];
      rows[rowIdx][col] = value;
      return rows;
    });
  };

  const handleSave = () => setSavedNote("Guardado hace unos segundos");

  const handleEditPost = (index: number) => {
    setEditingPostIndex(index);
    setScreen("postEditor");
  };

  const handleNewPost = () => {
    setPosts((prev) => [...prev, newBlogPost()]);
    setEditingPostIndex(posts.length);
    setScreen("postEditor");
  };

  const handlePostChange = (patch: Partial<BlogPost>) => {
    if (editingPostIndex === null) return;
    setPosts((prev) => prev.map((p, i) => (i === editingPostIndex ? { ...p, ...patch } : p)));
  };

  const handleTogglePostStatus = () => {
    if (editingPostIndex === null) return;
    setPosts((prev) =>
      prev.map((p, i) => (i === editingPostIndex ? { ...p, estado: p.estado === "Publicada" ? "Borrador" : "Publicada" } : p)),
    );
  };

  const handleToggleDestacado = () => {
    if (editingPostIndex === null) return;
    setPosts((prev) => prev.map((p, i) => (i === editingPostIndex ? { ...p, destacado: !p.destacado } : p)));
  };

  const handlePickCategory = (cat: string) => {
    if (editingPostIndex === null) return;
    setPosts((prev) => prev.map((p, i) => (i === editingPostIndex ? { ...p, cat } : p)));
  };

  const handleGlobalDataChange = (key: keyof GlobalData, value: string) => {
    setGlobalData((prev) => ({ ...prev, [key]: value }));
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const editingPost = editingPostIndex !== null ? posts[editingPostIndex] : null;
  const crumb =
    screen === "pageEditor" ? currentPage : screen === "postEditor" ? editingPost?.titulo || "Nueva publicación" : crumbs[screen];

  let content: React.ReactNode;
  switch (screen) {
    case "dashboard":
      content = <DashboardScreen pageStatus={pageStatus} posts={posts} onNavigate={handleNavigate} />;
      break;
    case "pages":
      content = (
        <PagesScreen
          pageStatus={pageStatus}
          onToggle={handleTogglePage}
          onEdit={(page) => handleNavigate("pageEditor", page)}
        />
      );
      break;
    case "pageEditor":
      content = (
        <PageEditorScreen
          page={currentPage}
          tab={currentTab}
          status={pageStatus[currentPage]}
          savedNote={savedNote}
          values={contentValues}
          repeaterRows={repeaterRows}
          onTabChange={setCurrentTab}
          onFieldChange={handleFieldChange}
          onRepeaterCellChange={handleRepeaterCellChange}
          onAddRepeaterRow={handleAddRepeaterRow}
          onSave={handleSave}
          onNavigateLink={(s) => handleNavigate(s)}
        />
      );
      break;
    case "series":
      content = (
        <SeriesScreen
          rows={seriesData}
          savedNote={savedNote}
          onCellChange={handleSeriesCellChange}
          onSave={handleSave}
        />
      );
      break;
    case "blogList":
      content = (
        <BlogListScreen posts={posts} filter={postFilter} onFilterChange={setPostFilter} onEdit={handleEditPost} onNew={handleNewPost} />
      );
      break;
    case "postEditor":
      content = editingPost && (
        <PostEditorScreen
          post={editingPost}
          savedNote={savedNote}
          onBack={() => setScreen("blogList")}
          onChange={handlePostChange}
          onToggleStatus={handleTogglePostStatus}
          onToggleDestacado={handleToggleDestacado}
          onPickCategory={handlePickCategory}
          onSave={handleSave}
        />
      );
      break;
    case "leads":
      content = <LeadsScreen />;
      break;
    case "usuarios":
      content = <UsersScreen />;
      break;
    case "archivos":
      content = <FilesScreen />;
      break;
    case "datos":
      content = (
        <GlobalDataScreen data={globalData} savedNote={savedNote} onChange={handleGlobalDataChange} onSave={handleSave} />
      );
      break;
    default:
      content = <PlaceholderScreen title={screenTitles[screen]} />;
  }

  return (
    <PanelShell
      screen={screen}
      crumb={crumb}
      lang={lang}
      onLangChange={setLang}
      onNavigate={handleNavigate}
      onLogout={() => setIsLoggedIn(false)}
      currentPageBadge={screen === "pageEditor" ? currentPage : undefined}
    >
      {content}
    </PanelShell>
  );
}
