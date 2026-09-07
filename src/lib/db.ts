import { supabase, isSupabaseConfigured } from './supabase';
import { initialGuests, initialEpisodes, initialLeads, initialSettings } from '@/data/initialData';
import { Guest, Episode, Lead, SiteSettings, LeadStatus } from '@/types';

// In-memory / local fallback state (persists during server runtime)
interface Store {
  guests: Guest[];
  episodes: Episode[];
  leads: Lead[];
  settings: SiteSettings;
}

// Global declaration for singleton store across hot-reloads
declare global {
  // eslint-disable-next-line no-var
  var __antaara_store: Store | undefined;
}

function getStore(): Store {
  if (!global.__antaara_store) {
    global.__antaara_store = {
      guests: [...initialGuests],
      episodes: [...initialEpisodes],
      leads: [...initialLeads],
      settings: { ...initialSettings },
    };
  }
  return global.__antaara_store;
}

// ================= GUESTS =================
export async function getGuests(): Promise<Guest[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .order('order_index', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          roleTitle: item.role_title,
          bio: item.bio,
          fullDescription: item.full_description,
          portraitUrl: item.portrait_url,
          youtubeUrl: item.youtube_url,
          episodeTitle: item.episode_title,
          keyTopics: item.key_topics || [],
          isFeatured: item.is_featured,
          orderIndex: item.order_index,
        }));
      }
    } catch (e) {
      console.warn('Supabase getGuests error, using local data:', e);
    }
  }
  return getStore().guests;
}

export async function getGuestBySlug(slug: string): Promise<Guest | null> {
  const guests = await getGuests();
  return guests.find((g) => g.slug === slug) || null;
}

export async function saveGuest(guest: Partial<Guest> & { name: string; category: Guest['category'] }): Promise<Guest> {
  const store = getStore();
  const id = guest.id || `guest-${Date.now()}`;
  const slug =
    guest.slug ||
    guest.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

  const completeGuest: Guest = {
    id,
    slug,
    name: guest.name,
    category: guest.category,
    roleTitle: guest.roleTitle || 'Featured Guest',
    bio: guest.bio || '',
    fullDescription: guest.fullDescription || guest.bio || '',
    portraitUrl: guest.portraitUrl || '/assets/shri-amogh-lila-das-ji.jpg',
    youtubeUrl: guest.youtubeUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    episodeTitle: guest.episodeTitle || `In Conversation with ${guest.name}`,
    keyTopics: guest.keyTopics || ['Conversations', 'Insights'],
    isFeatured: Boolean(guest.isFeatured),
    orderIndex: guest.orderIndex !== undefined ? guest.orderIndex : store.guests.length + 1,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('guests').upsert({
        id: completeGuest.id,
        slug: completeGuest.slug,
        name: completeGuest.name,
        category: completeGuest.category,
        role_title: completeGuest.roleTitle,
        bio: completeGuest.bio,
        full_description: completeGuest.fullDescription,
        portrait_url: completeGuest.portraitUrl,
        youtube_url: completeGuest.youtubeUrl,
        episode_title: completeGuest.episodeTitle,
        key_topics: completeGuest.keyTopics,
        is_featured: completeGuest.isFeatured,
        order_index: completeGuest.orderIndex,
      });
    } catch (e) {
      console.warn('Supabase saveGuest error, updating local store:', e);
    }
  }

  const existingIndex = store.guests.findIndex((g) => g.id === completeGuest.id);
  if (existingIndex >= 0) {
    store.guests[existingIndex] = completeGuest;
  } else {
    store.guests.push(completeGuest);
  }

  return completeGuest;
}

export async function deleteGuest(id: string): Promise<boolean> {
  const store = getStore();
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('guests').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteGuest error:', e);
    }
  }
  store.guests = store.guests.filter((g) => g.id !== id);
  return true;
}

// ================= EPISODES =================
export async function getEpisodes(): Promise<Episode[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('episodes')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          title: item.title,
          guestId: item.guest_id,
          guestName: item.guest_name,
          guestCategory: item.guest_category,
          description: item.description,
          youtubeUrl: item.youtube_url,
          thumbnailUrl: item.thumbnail_url,
          duration: item.duration,
          publishDate: item.publish_date,
          isFeatured: item.is_featured,
          keyTopics: item.key_topics || [],
        }));
      }
    } catch (e) {
      console.warn('Supabase getEpisodes error:', e);
    }
  }
  return getStore().episodes;
}

export async function getFeaturedEpisode(): Promise<Episode> {
  const episodes = await getEpisodes();
  const featured = episodes.find((e) => e.isFeatured);
  return featured || episodes[0] || initialEpisodes[0];
}

export async function saveEpisode(episode: Partial<Episode> & { title: string; guestName: string }): Promise<Episode> {
  const store = getStore();
  const id = episode.id || `ep-${Date.now()}`;

  const completeEpisode: Episode = {
    id,
    title: episode.title,
    guestId: episode.guestId || 'guest-1',
    guestName: episode.guestName,
    guestCategory: episode.guestCategory || 'Spirituality',
    description: episode.description || '',
    youtubeUrl: episode.youtubeUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: episode.thumbnailUrl || '/assets/amogh_lila_thumb.jpg',
    duration: episode.duration || '45:00',
    publishDate: episode.publishDate || new Date().toISOString().split('T')[0],
    isFeatured: Boolean(episode.isFeatured),
    keyTopics: episode.keyTopics || ['Podcast', 'Conversation'],
  };

  // If marked featured, unmark other episodes
  if (completeEpisode.isFeatured) {
    store.episodes.forEach((e) => {
      e.isFeatured = false;
    });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      if (completeEpisode.isFeatured) {
        await supabase.from('episodes').update({ is_featured: false }).neq('id', id);
      }
      await supabase.from('episodes').upsert({
        id: completeEpisode.id,
        title: completeEpisode.title,
        guest_id: completeEpisode.guestId,
        guest_name: completeEpisode.guestName,
        guest_category: completeEpisode.guestCategory,
        description: completeEpisode.description,
        youtube_url: completeEpisode.youtubeUrl,
        thumbnail_url: completeEpisode.thumbnailUrl,
        duration: completeEpisode.duration,
        publish_date: completeEpisode.publishDate,
        is_featured: completeEpisode.isFeatured,
        key_topics: completeEpisode.keyTopics,
      });
    } catch (e) {
      console.warn('Supabase saveEpisode error:', e);
    }
  }

  const existingIndex = store.episodes.findIndex((e) => e.id === completeEpisode.id);
  if (existingIndex >= 0) {
    store.episodes[existingIndex] = completeEpisode;
  } else {
    store.episodes.unshift(completeEpisode);
  }

  return completeEpisode;
}

export async function deleteEpisode(id: string): Promise<boolean> {
  const store = getStore();
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('episodes').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteEpisode error:', e);
    }
  }
  store.episodes = store.episodes.filter((e) => e.id !== id);
  return true;
}

// ================= LEADS =================
export async function getLeads(): Promise<Lead[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          subject: item.subject,
          message: item.message,
          status: item.status as LeadStatus,
          notes: item.notes,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase getLeads error:', e);
    }
  }
  return getStore().leads;
}

export async function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: LeadStatus }): Promise<Lead> {
  const store = getStore();
  const id = `lead-${Date.now()}`;
  const now = new Date().toISOString();

  const newLead: Lead = {
    id,
    name: leadData.name.trim(),
    email: leadData.email.trim(),
    phone: leadData.phone?.trim() || '',
    subject: leadData.subject,
    message: leadData.message.trim(),
    status: leadData.status || 'New',
    createdAt: now,
    notes: leadData.notes || '',
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('leads').insert({
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        subject: newLead.subject,
        message: newLead.message,
        status: newLead.status,
        notes: newLead.notes,
      }).select().single();
      if (!error && data) {
        newLead.id = data.id;
        newLead.createdAt = data.created_at;
      }
    } catch (e) {
      console.warn('Supabase createLead error:', e);
    }
  }

  store.leads.unshift(newLead);
  return newLead;
}

export async function updateLeadStatus(id: string, status: LeadStatus, notes?: string): Promise<Lead | null> {
  const store = getStore();
  const lead = store.leads.find((l) => l.id === id);

  if (isSupabaseConfigured && supabase) {
    try {
      const payload: Record<string, unknown> = {
        status,
        updated_at: new Date().toISOString(),
      };
      if (notes !== undefined) payload.notes = notes;
      await supabase.from('leads').update(payload).eq('id', id);
    } catch (e) {
      console.warn('Supabase updateLeadStatus error:', e);
    }
  }

  if (lead) {
    lead.status = status;
    if (notes !== undefined) lead.notes = notes;
    lead.updatedAt = new Date().toISOString();
    return lead;
  }
  return null;
}

export async function deleteLead(id: string): Promise<boolean> {
  const store = getStore();
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('leads').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteLead error:', e);
    }
  }
  store.leads = store.leads.filter((l) => l.id !== id);
  return true;
}

// ================= SETTINGS =================
export async function getSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 'primary')
        .single();
      if (!error && data) {
        return {
          siteTitle: data.site_title,
          tagline: data.tagline,
          hostName: data.host_name,
          hostRole: data.host_role,
          hostBio: data.host_bio,
          hostPortraitUrl: data.host_portrait_url,
          contactPhone: data.contact_phone,
          contactEmail: data.contact_email,
          contactAddress: data.contact_address,
          instagramUrl: data.instagram_url,
          youtubeUrl: data.youtube_url,
          featuredEpisodeId: data.featured_episode_id,
        };
      }
    } catch (e) {
      console.warn('Supabase getSettings error:', e);
    }
  }
  return getStore().settings;
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = getStore();
  store.settings = { ...store.settings, ...settings };

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('settings').upsert({
        id: 'primary',
        site_title: store.settings.siteTitle,
        tagline: store.settings.tagline,
        host_name: store.settings.hostName,
        host_role: store.settings.hostRole,
        host_bio: store.settings.hostBio,
        host_portrait_url: store.settings.hostPortraitUrl,
        contact_phone: store.settings.contactPhone,
        contact_email: store.settings.contactEmail,
        contact_address: store.settings.contactAddress,
        instagram_url: store.settings.instagramUrl,
        youtube_url: store.settings.youtubeUrl,
        featured_episode_id: store.settings.featuredEpisodeId,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Supabase updateSettings error:', e);
    }
  }

  return store.settings;
}
