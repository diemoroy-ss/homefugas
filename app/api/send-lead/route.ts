import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, commune, email } = body;

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { status: 'error', message: 'El nombre debe tener al menos 2 caracteres.' },
        { status: 400 }
      );
    }

    if (!phone || !/^\+56\d{9}$/.test(phone.trim())) {
      return NextResponse.json(
        { status: 'error', message: 'El teléfono debe seguir el formato +569XXXXXXXX.' },
        { status: 400 }
      );
    }

    const leadData = {
      name: name.trim(),
      phone: phone.trim(),
      commune: commune || 'Viña del Mar',
      email: email ? email.trim() : '',
      status: 'Nuevo',
      createdAt: serverTimestamp(),
    };

    // Save lead to Firestore
    try {
      await addDoc(collection(db, 'leads'), leadData);
    } catch (fsError) {
      console.warn('Advertencia: No se pudo guardar en Firestore (continuando respaldo local):', fsError);
    }

    // Backup lead log to server file
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logEntry = `[${new Date().toISOString()}] Name: ${name} | Phone: ${phone} | Commune: ${commune || 'Viña del Mar'} | Email: ${email || 'N/A'}\n`;
    fs.appendFileSync(path.join(logDir, 'leads.log'), logEntry, 'utf-8');

    return NextResponse.json({
      status: 'success',
      message: 'Lead registrado correctamente para la Región de Valparaíso.',
    });
  } catch (error: any) {
    console.error('API send-lead error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Ocurrió un error interno al procesar el lead.' },
      { status: 500 }
    );
  }
}
