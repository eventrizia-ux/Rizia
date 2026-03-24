import { supabase } from './supabaseClient';

// =====================================================
// EVENTS OPERATIONS
// =====================================================

export const fetchAllEvents = async () => {
  try {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const fetchActiveEvents = async () => {
  try {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching active events:', error);
    return [];
  }
};

export const fetchEventById = async (id: string) => {
  try {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

export const createEvent = async (eventData: any) => {
  try {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id: string, eventData: any) => {
  try {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    if (!supabase) return false;
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
  }
};

// =====================================================
// BOOKINGS OPERATIONS
// =====================================================

export const fetchAllBookings = async () => {
  try {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('bookings')
      .select('*, users(name, email)')
      .order('booking_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

export const fetchUserBookings = async (userId: string) => {
  try {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('booking_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return [];
  }
};

export const createBooking = async (bookingData: any) => {
  try {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// =====================================================
// USERS OPERATIONS
// =====================================================

export const fetchAllUsers = async () => {
  try {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('users')
      .select('*, users_login(email, is_admin, last_login_at)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// =====================================================
// ANALYTICS OPERATIONS
// =====================================================

export const fetchDashboardStats = async () => {
  try {
    if (!supabase) {
      return {
        totalEvents: 0,
        totalBookings: 0,
        totalUsers: 0,
        totalRevenue: 0
      };
    }

    const [eventsRes, bookingsRes, usersRes] = await Promise.all([
      supabase.from('events').select('id', { count: 'exact' }),
      supabase.from('bookings').select('id, total_price', { count: 'exact' }),
      supabase.from('users').select('id', { count: 'exact' })
    ]);

    const totalRevenue = bookingsRes.data?.reduce((sum, booking) => {
      return sum + (parseFloat(booking.total_price) || 0);
    }, 0) || 0;

    return {
      totalEvents: eventsRes.count || 0,
      totalBookings: bookingsRes.count || 0,
      totalUsers: usersRes.count || 0,
      totalRevenue: totalRevenue
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalEvents: 0,
      totalBookings: 0,
      totalUsers: 0,
      totalRevenue: 0
    };
  }
};
