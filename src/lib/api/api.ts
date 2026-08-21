import Cookies from "js-cookie";

/* ======================================================
   ENV
====================================================== */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const TOKEN_KEY = "token";

/* ======================================================
   BASE API RESPONSE
====================================================== */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/* ======================================================
   ENUMS (MATCH PRISMA)
====================================================== */
export type Role = "ADMIN" | "PATIENT" | "PHARMACIST";

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export type NotificationType = "SYSTEM" | "ORDER" | "MESSAGE";

/* ======================================================
   TOKEN HELPERS
====================================================== */
export const authToken = {
  get(): string | undefined {
    return Cookies.get(TOKEN_KEY);
  },

  set(token: string) {
    Cookies.set(TOKEN_KEY, token, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  },

  remove() {
    Cookies.remove(TOKEN_KEY, { path: '/' });
  },
};

/* ======================================================
   CORE API CLIENT
====================================================== */
class ApiClient {
  constructor(private readonly baseUrl: string) { }

  private async request<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown
): Promise<ApiResponse<T>> {

  const headers: Record<string, string> = {};

  // ✅ Add token if exists
  if (typeof window !== 'undefined') {
    const token = authToken.get()
if (token) {
  headers.Authorization = `Bearer ${token}`
}

  }

  const isFormData = body instanceof FormData;

  // ✅ Only set JSON header if NOT FormData
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body:
        body === undefined
          ? undefined
          : isFormData
          ? body
          : JSON.stringify(body),
      credentials: 'include',
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error:
          typeof json === "object" && json && "error" in json
            ? String((json as { error?: unknown }).error)
            : "حدث خطأ أثناء تنفيذ الطلب",
      };
    }

    const payload = json as BackendResponse<T> | T

    if (
      payload &&
      typeof payload === 'object' &&
      'data' in payload
    ) {
      return { success: true, data: payload.data }
    }

    return { success: true, data: payload }

  } catch {
    return { success: false, error: "فشل الاتصال بالخادم" };
  }
}


  get<T>(endpoint: string) {
    return this.request<T>(endpoint, "GET");
  }

  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "POST", body);
  }

  put<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "PUT", body);
  }

  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, "PATCH", body);
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, "DELETE");
  }
}

export const api = new ApiClient(API_BASE_URL);

////////////////////////////////////////////////////////////////////////////////
// ========================= AUTH (PHARMACIST) ===============================
////////////////////////////////////////////////////////////////////////////////

export type PharmacistLoginInput = {
  username: string;
  password: string;
};

type BackendResponse<T> = {
  success: boolean
  data: T
  error?: string
}


export type PharmacistLoginResponse = {
    token: string;
    pharmacist: {
      id: number; 
      pharmacyId: number;
      pharmacyName: string;
    };
  };


export const pharmacistAuthApi = {
  login(data: PharmacistLoginInput) {
    return api.post<PharmacistLoginResponse>("/pharmacist/login", data);
  },

  logout() {
    authToken.remove();
  },
};

////////////////////////////////////////////////////////////////////////////////
// ========================= DASHBOARD ===============================
////////////////////////////////////////////////////////////////////////////////

export type PharmacistDashboardResponse = {
  pharmacy: {
    id: number;
    name: string;
  } | null;

  stats: {
    pendingOrders: number;
    completedOrders: number;
    rejectedOrders: number;
    stockCount: number;
  };

  notifications: PharmacistNotification[];
};

export const pharmacistDashboardApi = {
  getDashboard() {
    return api.get<PharmacistDashboardResponse>("/pharmacist/dashboard");
  },
};

////////////////////////////////////////////////////////////////////////////////
// ========================= PROFILE ===============================
////////////////////////////////////////////////////////////////////////////////

export type PharmacistProfile = {
  id: number;
  userId: number;
  user: {
    id: number;
    username: string;
    email: string;
    role: Role;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  pharmacy: {
    id: number;
    name: string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
    phone: string;
    licenseNumber: string;
    licenseIssuedAt: string;
    licenseExpiresAt: string;
    pharmacistId: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export const pharmacistProfileApi = {
  getMyProfile() {
    return api.get<PharmacistProfile>("/pharmacist/profile");
  },
};

////////////////////////////////////////////////////////////////////////////////
// ========================= DRUGS (GLOBAL) ===============================
////////////////////////////////////////////////////////////////////////////////

export type DrugDto = {
  id: number;
  name: string;
  strength: string;
  description?: string | null;

  composition: string;
  indications: string;
  contraindications: string;
  dosage: string;
  warnings: string;
  sideEffects: string;
  interactions: string;
  overdose: string;
};

////////////////////////////////////////////////////////////////////////////////
// ========================= DRUG COMPARISON ===============================
////////////////////////////////////////////////////////////////////////////////

export type DrugInteractionDto = {
  severity: string;
  warning: string;
} | null;

export type DrugComparisonResult = {
  drugA: DrugDto;
  drugB: DrugDto;
  interaction: {
    severity: string;
    warning: string;
  } | null;
};

export const pharmacistDrugsApi = {
  // جلب جميع الأدوية (قراءة فقط)
  getAll() {
    return api.get<DrugDto[]>('/drugs')
  },

  // البحث بالاسم (من API الأدمن)
  searchByName(name: string) {
    return api.get<DrugDto[]>(`/drugs?search=${encodeURIComponent(name)}`)
  },

  // مقارنة دوائين بالاسم
  compareByName(drugAName: string, drugBName: string) {
    return api.post<DrugComparisonResult>(
      '/pharmacist/drugs/compare',
      {
        drugAName,
        drugBName,
      }
    )
  },
}


////////////////////////////////////////////////////////////////////////////////
// ========================= STOCK ===============================
////////////////////////////////////////////////////////////////////////////////

export type CustomPharmacyDrugDto = {
  id: number
  name: string
  strength?: string | null
  price: number
  notes?: string | null
}

export type PharmacyStockItem = {
  id: number
  pharmacyId: number

  drugId?: number | null
  customDrugId?: number | null

  quantity: number
  price: number

  drug?: DrugDto | null
  customDrug?: CustomPharmacyDrugDto | null
}


export const pharmacistStockApi = {
  getStock() {
    return api.get<PharmacyStockItem[]>("/pharmacist/stock")
  },

  addDrug(data: {
    drugId?: number
    customDrug?: {
      name: string
      strength?: string
      price: number
      notes?: string
    }
    quantity: number
  }) {
    return api.post<PharmacyStockItem>(
      "/pharmacist/stock",
      data
    )
  },

  update(
  stockId: number,
  data: {
    quantity: number
    price: number
  }
) {
  return api.put<PharmacyStockItem>(
    `/pharmacist/stock/${stockId}`,
    data
  )
},


  remove(stockId: number) {
    return api.delete<void>(
      `/pharmacist/stock/${stockId}`
    )
  },
}


////////////////////////////////////////////////////////////////////////////////
// ========================= ORDERS ===============================
////////////////////////////////////////////////////////////////////////////////

export type PatientDto = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type PharmacistOrder = {
  id: number;
  patientId: number;
  pharmacistId?: number | null;
  drugName: string;
  quantity: number;
  prescriptionImage?: string | null;
  status: OrderStatus;
  patient: PatientDto;
  createdAt: string;
};

export const pharmacistOrdersApi = {
  getOrders() {
    return api.get<PharmacistOrder[]>("/pharmacist/orders");
  },

  accept(orderId: number) {
    return api.put<PharmacistOrder>(
      `/pharmacist/orders/${orderId}/accept`
    );
  },
  
  updateStatus(
    orderId: number,
    status: "ACCEPTED" | "REJECTED" | "COMPLETED"
  ) {
    return api.patch<PharmacistOrder>(
      `/pharmacist/orders/${orderId}/status`,
      { status }
    );
  },
};

////////////////////////////////////////////////////////////////////////////////
// ========================= NOTIFICATIONS ===============================
////////////////////////////////////////////////////////////////////////////////

export type PharmacistNotification = {
  id: number;
  userId?: number | null;
  toRole?: Role | null;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export const pharmacistNotificationsApi = {
  getNotifications() {
    return api.get<PharmacistNotification[]>(
      "/pharmacist/notifications"
    );
  },

  markAsRead(id: number) {
    return api.patch<void>(
      `/pharmacist/notifications/${id}/read`
    );
  },

  getUnreadCount() {
    return api.get<number>('/pharmacist/notifications/unread-count')
  },
};

////////////////////////////////////////////////////////////////////////////////
// ========================= SETTINGS ===============================
////////////////////////////////////////////////////////////////////////////////

export type PharmacistSetting = {
  key: string;
  value: string;
};

export const pharmacistSettingsApi = {
  getSettings() {
    return api.get<PharmacistSetting[]>("/pharmacist/settings");
  },

  updateSettings(settings: PharmacistSetting[]) {
    return api.put<void>("/pharmacist/settings", { settings });
  },
};

////////////////////////////////////////////////////////////////////////////////
// ========================= OCR ===============================
////////////////////////////////////////////////////////////////////////////////

export type OCRScanDto = {
  id: number;
  imageUrl: string;
  text: string;
  language: string;
  createdAt: string;
};

export type OCRDrugScanResponse = {
  scan: OCRScanDto;
  drug?: DrugDto | null;
};

export type OCRPrescriptionScanResponse = {
  scan: OCRScanDto;
  prescription?: {
    id: number;
    imageUrl: string;
    content: string;
    translatedContent?: string | null;
    createdAt: string;
  } | null;
  extractedDrugNames?: string[];
};

export const ocrApi = {
  scanDrug(formData: FormData) {
    return api.post<OCRDrugScanResponse>(
      "/pharmacist/ocr/scan",
      formData
    );
  },

  scanPrescription(formData: FormData) {
    return api.post<OCRPrescriptionScanResponse>(
      "/pharmacist/ocr/scan",
      formData
    );
  },
};

////////////////////////////////////////////////////////////////////////////////
// ========================= AI ASSISTANT ===============================
////////////////////////////////////////////////////////////////////////////////

export const aiApi = {
  chat(message: string, language: "ar" | "en") {
    return api.post<{
      question: string;
      answer: string;
      meta?: {
        model?: string;
        confidence?: number | null;
      };
    }>("/pharmacist/ai/chat", { message, language });
  },
};

export const translateApi = {
  translate(
    text: string,
    from: "ar" | "en",
    to: "ar" | "en"
  ) {
    return api.post<{ translation: string }>(
      "/pharmacist/translate/translate",
      { text, from, to }
    )
  },
}
