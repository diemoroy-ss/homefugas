'use client';

import React, { useEffect, useState } from 'react';
import {
  auth,
  googleProvider,
  db,
  ALLOWED_EMAILS,
  initAnalytics,
} from '@/lib/firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  LogOut,
  ShieldAlert,
  Search,
  Download,
  PhoneCall,
  CheckCircle,
  Clock,
  UserCheck,
  Building,
  BarChart3,
  RefreshCw,
  MessageSquare,
  Trash2,
  Sparkles,
  MapPin,
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  commune?: string;
  service?: string;
  email?: string;
  status?: 'Nuevo' | 'Contactado' | 'Cotizado' | 'Cerrado';
  createdAt?: any;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState('');

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  useEffect(() => {
    initAnalytics();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userEmail = currentUser.email?.toLowerCase() || '';
        if (ALLOWED_EMAILS.includes(userEmail)) {
          setUser(currentUser);
          setAuthError('');
        } else {
          // Reject Unauthorized User
          setUser(null);
          setAuthError(
            `Acceso Denegado: El correo "${currentUser.email}" no está autorizado para acceder al panel de administración.`
          );
          signOut(auth);
        }
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time Firestore Listener for Leads
  useEffect(() => {
    if (!user) return;

    setLoadingLeads(true);
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('createdAt', 'desc'));

    const unsubscribeLeads = onSnapshot(
      q,
      (snapshot) => {
        const loadedLeads: Lead[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Lead[];
        setLeads(loadedLeads);
        setLoadingLeads(false);
      },
      (error) => {
        console.error('Error escuchando leads en Firestore:', error);
        setLoadingLeads(false);
      }
    );

    return () => unsubscribeLeads();
  }, [user]);

  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email?.toLowerCase() || '';

      if (!ALLOWED_EMAILS.includes(email)) {
        setAuthError(
          `Acceso Denegado: El correo "${email}" no está autorizado para acceder al panel.`
        );
        await signOut(auth);
      }
    } catch (error: any) {
      console.error('Error detallado de Google Auth:', error);
      if (error.code === 'auth/unauthorized-domain') {
        setAuthError(
          'Dominio no Autorizado: Debes agregar "homefugas.cl" en la Consola de Firebase -> Authentication -> Configuración -> Dominios Autorizados.'
        );
      } else if (error.code === 'auth/popup-blocked') {
        setAuthError(
          'Ventana Emergente Bloqueada: Por favor habilita los popups en tu navegador para continuar.'
        );
      } else if (error.code === 'auth/popup-closed-by-user') {
        setAuthError('Se cerró la ventana de autenticación antes de completar el inicio de sesión.');
      } else {
        setAuthError(`Error de autenticación (${error.code || 'Auth Error'}): ${error.message || 'Por favor reintenta.'}`);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { status: newStatus });
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este prospecto?')) {
      try {
        await deleteDoc(doc(db, 'leads', leadId));
      } catch (err) {
        console.error('Error al eliminar lead:', err);
      }
    }
  };

  // Filtered Leads Calculation
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCommune =
      selectedCommune === 'Todas' || lead.commune === selectedCommune;

    const matchesStatus =
      selectedStatus === 'Todos' || (lead.status || 'Nuevo') === selectedStatus;

    return matchesSearch && matchesCommune && matchesStatus;
  });

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = ['Fecha', 'Nombre', 'Teléfono', 'Comuna', 'Servicio', 'Correo', 'Estado'];
    const rows = filteredLeads.map((l) => [
      formatDate(l.createdAt),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.commune || 'V Región'}"`,
      `"${l.service || 'General'}"`,
      `"${l.email || 'N/A'}"`,
      `"${l.status || 'Nuevo'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `leads_homefugas_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateField: any) => {
    if (!dateField) return 'Reciente';
    if (dateField?.toDate) {
      return dateField.toDate().toLocaleString('es-CL');
    }
    if (typeof dateField === 'string') {
      return new Date(dateField).toLocaleString('es-CL');
    }
    return 'Reciente';
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-800">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <RefreshCw className="w-10 h-10 animate-spin text-purple-600" />
          <p className="text-sm font-semibold">Cargando Panel de Administración...</p>
        </div>
      </div>
    );
  }

  // 🔒 LOGIN SCREEN (LIGHT THEME)
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-xl space-y-6 text-center">
          {/* Header Logo */}
          <div className="flex justify-center mb-2">
            <img
              src="/assets/images/home-fugas-logo.svg"
              alt="Home Fugas"
              className="h-12 w-auto"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Panel de Administración</h1>
            <p className="text-xs text-slate-500">
              Acceso exclusivo para administradores de Home Fugas (Región de Valparaíso)
            </p>
          </div>

          {authError && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-700 text-left flex items-start gap-2 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition shadow-lg text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Iniciar Sesión con Google
          </button>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
            Correos autorizados: santisoftai@gmail.com, mlelax@gmail.com, spahomefugas@gmail.com
          </div>
        </div>
      </div>
    );
  }

  // 📊 ADMIN DASHBOARD SCREEN (WHITE LIGHT THEME)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/home-fugas-logo.svg"
              alt="Home Fugas"
              className="h-10 w-auto"
            />
            <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs px-3 py-1 rounded-full font-bold shadow-xs">
              Panel Admin V Región
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-900">{user.displayName || 'Administrador'}</span>
              <span className="text-[11px] text-slate-500">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-700 border border-slate-200 rounded-xl transition flex items-center gap-2 text-xs font-bold"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Prospectos</span>
              <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">{leads.length}</div>
            <p className="text-xs text-slate-500 font-medium">Registrados en la plataforma</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nuevos Leads</span>
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-600">
              {leads.filter((l) => (l.status || 'Nuevo') === 'Nuevo').length}
            </div>
            <p className="text-xs text-amber-700 font-medium">Pendientes por contactar</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Comunas V Región</span>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600">
              {new Set(leads.map((l) => l.commune || 'Viña del Mar')).size}
            </div>
            <p className="text-xs text-slate-500 font-medium">Comunas activas solicitadas</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Google Analytics</span>
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              G-ZX5SBTWNE9
            </div>
            <p className="text-xs text-slate-500 font-medium">Midiendo conversiones en vivo</p>
          </div>

        </div>

        {/* Toolbar: Search, Filters & CSV Export */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-1">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, teléfono o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition font-medium"
              />
            </div>

            {/* Commune Filter */}
            <div className="relative">
              <select
                value={selectedCommune}
                onChange={(e) => setSelectedCommune(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
              >
                <option value="Todas">Todas las Comunas</option>
                <option value="Viña del Mar">Viña del Mar</option>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Concón">Concón</option>
                <option value="Reñaca">Reñaca</option>
                <option value="Quilpué">Quilpué</option>
                <option value="Villa Alemana">Villa Alemana</option>
                <option value="Quillota">Quillota</option>
                <option value="San Antonio">San Antonio</option>
                <option value="Los Andes">Los Andes</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
              >
                <option value="Todos">Todos los Estados</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Contactado">Contactado</option>
                <option value="Cotizado">Cotizado</option>
                <option value="Cerrado">Cerrado</option>
              </select>
            </div>

          </div>

          {/* Export CSV Button */}
          <button
            onClick={exportToCSV}
            className="w-full md:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md whitespace-nowrap cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Exportar CSV ({filteredLeads.length})
          </button>
        </div>

        {/* Table of Leads */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-100/80 text-slate-700 uppercase text-[11px] font-bold border-b border-slate-200 tracking-wider">
                <tr>
                  <th className="px-5 py-4">Fecha</th>
                  <th className="px-5 py-4">Nombre / Contacto</th>
                  <th className="px-5 py-4">Comuna</th>
                  <th className="px-5 py-4">Estado</th>
                  <th className="px-5 py-4 text-center">Acción Directa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {loadingLeads ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-500">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-600" />
                      Cargando prospectos en tiempo real...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-500">
                      No se encontraron prospectos con los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-5 py-4 text-slate-500 text-xs font-medium whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-5 py-4 space-y-1">
                        <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="font-medium text-slate-700">📞 {lead.phone}</span>
                          {lead.email && <span className="text-slate-400">| ✉️ {lead.email}</span>}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-800">
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs border border-slate-200">
                          📍 {lead.commune || 'V Región'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={lead.status || 'Nuevo'}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`text-xs px-3 py-1.5 rounded-full border font-bold cursor-pointer transition shadow-xs ${
                            (lead.status || 'Nuevo') === 'Nuevo'
                              ? 'bg-amber-100 border-amber-300 text-amber-800'
                              : lead.status === 'Contactado'
                              ? 'bg-sky-100 border-sky-300 text-sky-800'
                              : lead.status === 'Cotizado'
                              ? 'bg-purple-100 border-purple-300 text-purple-800'
                              : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                          }`}
                        >
                          <option value="Nuevo" className="bg-white text-slate-900">● Nuevo</option>
                          <option value="Contactado" className="bg-white text-slate-900">● Contactado</option>
                          <option value="Cotizado" className="bg-white text-slate-900">● Cotizado</option>
                          <option value="Cerrado" className="bg-white text-slate-900">● Cerrado</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* WhatsApp Direct 1-Click Action */}
                          <a
                            href={`https://api.whatsapp.com/send?phone=${lead.phone.replace(/[^0-9]/g, '')}&text=Hola%20${encodeURIComponent(lead.name)},%20te%20contactamos%20de%20Home%20Fugas%20respecto%20a%20tu%20solicitud%20en%20${encodeURIComponent(lead.commune || 'la V Región')}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                            title="Hablar por WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            WhatsApp
                          </a>

                          {/* Delete Lead Button */}
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                            title="Eliminar Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
