export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      driver_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          phone: string;
          email: string | null;
          rating: number;
          total_rides: number;
          verified: boolean;
          is_online: boolean;
          vehicle_category: string;
          vehicle_model: string | null;
          reg_no: string | null;
          joined_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['driver_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['driver_profiles']['Insert']>;
      };
      rides: {
        Row: {
          id: string;
          rider_id: string;
          driver_id: string | null;
          pickup: string;
          destination: string;
          distance_km: number;
          duration_min: number;
          category: string;
          status: string;
          fare: number;
          driver_earnings: number;
          rating: number | null;
          created_at: string;
          accepted_at: string | null;
          completed_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['rides']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['rides']['Insert']>;
      };
      driver_documents: {
        Row: {
          id: string;
          driver_id: string;
          doc_type: string;
          status: string;
          file_url: string | null;
          expiry_date: string | null;
          rejection_reason: string | null;
          uploaded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['driver_documents']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['driver_documents']['Insert']>;
      };
    };
  };
}
