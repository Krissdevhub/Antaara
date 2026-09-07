import { NextResponse } from 'next/server';
import { getLeads, createLead } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const lead = await createLead({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject || 'General Enquiry',
      message: body.message,
      notes: body.notes,
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
