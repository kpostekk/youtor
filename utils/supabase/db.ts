export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      learning_chapters: {
        Row: {
          content: string
          createdAt: string
          id: string
          lsId: string
          title: string
        }
        Insert: {
          content: string
          createdAt?: string
          id?: string
          lsId: string
          title: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          lsId?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_learning_chapters_lsId_fkey"
            columns: ["lsId"]
            isOneToOne: false
            referencedRelation: "learning_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_sessions: {
        Row: {
          authorId: string
          createdAt: string
          google_prompt: string | null
          id: string
          introduction_prompt: string | null
          prompt: string
          quiz_prompt: string | null
          summary: string | null
          teacher_prompt: string | null
          video_url: string | null
        }
        Insert: {
          authorId?: string
          createdAt?: string
          google_prompt?: string | null
          id?: string
          introduction_prompt?: string | null
          prompt: string
          quiz_prompt?: string | null
          summary?: string | null
          teacher_prompt?: string | null
          video_url?: string | null
        }
        Update: {
          authorId?: string
          createdAt?: string
          google_prompt?: string | null
          id?: string
          introduction_prompt?: string | null
          prompt?: string
          quiz_prompt?: string | null
          summary?: string | null
          teacher_prompt?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_learning_sessions_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      quizes: {
        Row: {
          id: number
          lsId: string
          name: string | null
        }
        Insert: {
          id?: number
          lsId: string
          name?: string | null
        }
        Update: {
          id?: number
          lsId?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_quizes_lsId_fkey"
            columns: ["lsId"]
            isOneToOne: false
            referencedRelation: "learning_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      quizes_answers: {
        Row: {
          answer: string
          correct: boolean
          id: number
          qId: number | null
        }
        Insert: {
          answer: string
          correct: boolean
          id?: number
          qId?: number | null
        }
        Update: {
          answer?: string
          correct?: boolean
          id?: number
          qId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_quizes_answers_qId_fkey"
            columns: ["qId"]
            isOneToOne: false
            referencedRelation: "quizes_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quizes_questions: {
        Row: {
          id: number
          question: string
          quizId: number
        }
        Insert: {
          id?: number
          question: string
          quizId: number
        }
        Update: {
          id?: number
          question?: string
          quizId?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_quizes_questions_quizId_fkey"
            columns: ["quizId"]
            isOneToOne: false
            referencedRelation: "quizes"
            referencedColumns: ["id"]
          },
        ]
      }
      scrapping_images: {
        Row: {
          createdAt: string
          id: number
          imageUrl: string
          lsId: string | null
          pageUrl: string
        }
        Insert: {
          createdAt?: string
          id?: number
          imageUrl: string
          lsId?: string | null
          pageUrl: string
        }
        Update: {
          createdAt?: string
          id?: number
          imageUrl?: string
          lsId?: string | null
          pageUrl?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_scrapping_images_lsId_fkey"
            columns: ["lsId"]
            isOneToOne: false
            referencedRelation: "learning_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      scrapping_text: {
        Row: {
          createdAt: string
          id: number
          lsId: string | null
          pageUrl: string
          scrappedContent: string
        }
        Insert: {
          createdAt?: string
          id?: number
          lsId?: string | null
          pageUrl: string
          scrappedContent: string
        }
        Update: {
          createdAt?: string
          id?: number
          lsId?: string | null
          pageUrl?: string
          scrappedContent?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_scrapping_text_lsId_fkey"
            columns: ["lsId"]
            isOneToOne: false
            referencedRelation: "learning_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
