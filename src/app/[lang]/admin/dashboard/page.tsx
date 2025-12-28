"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Users,
  Globe,
  TrendingUp,
  Activity,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase-browser";

type Summary = {
  totalVisits: number;
};

type CountryData = {
  country: string;
  count: number;
};

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [country, setCountry] = useState<CountryData[]>([]);
  const [visits, setVisits] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace(`/${lang}/admin/login`);
        return;
      }

      setLoading(false);

      fetch("/api/analytics/summary")
        .then((res) => res.json())
        .then((data) => setSummary(data));

      fetch("/api/analytics/country")
        .then((res) => res.json())
        .then((data) => setCountry(data));

      fetch("/api/analytics/visits")
        .then(res => res.json())
        .then(setVisits);
    };

    init();
  }, [router, lang]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${lang}/admin/login`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  const colors = ["#ffffff", "#d1d5db", "#9ca3af", "#6b7280", "#4b5563"];
  const totalVisits = summary?.totalVisits ?? 0;

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Arara Art Analytics
            </h1>
            <p className="text-white">
              Monitor pengunjung galeri seni Anda secara real-time
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-white transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto">

          {/* Total Visitors */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 text-black shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-black/10 p-3 rounded-2xl">
                <Users className="w-8 h-8" />
              </div>
              <div className="bg-black/10 px-3 py-1 rounded-full text-sm">
                Total
              </div>
            </div>

            <div className="mt-8">
              <p className="text-black/60 text-lg mb-2">
                Total Pengunjung
              </p>
              <h2 className="text-6xl font-bold mb-4">
                {totalVisits.toLocaleString()}
              </h2>
              <div className="flex items-center gap-2 text-black/70">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">
                  +12% dari bulan lalu
                </span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <p className="text-white text-sm mb-2">
              Aktif Hari Ini
            </p>
            <h3 className="text-3xl font-bold text-white">
              {Math.floor(totalVisits * 0.15)}
            </h3>
          </div>

          {/* Countries Count */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <p className="text-white text-sm mb-2">
              Negara
            </p>
            <h3 className="text-3xl font-bold text-white">
              {country.length}
            </h3>
          </div>

          {/* Chart */}
          <div className="md:col-span-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Pengunjung per Negara
              </h2>
              <div className="bg-white/10 px-4 py-2 rounded-full text-sm text-white">
                Top {country.length}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={country}>
                <XAxis dataKey="country" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {country.map((_, index) => (
                    <Cell
                      key={index}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detail */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 text-black shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold mb-6">
              Detail Pengunjung
            </h3>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
              {visits.map((item, index) => (
                <div
                  key={index}
                  className="border border-black/10 rounded-xl p-4 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      />
                      <span className="font-semibold">
                        {item.country} — {item.city || "Unknown"}
                      </span>
                    </div>

                    <span className="text-sm text-black/50">
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-sm text-black/70">
                    Halaman:{" "}
                    <span className="font-medium">
                      {item.page}
                    </span>
                  </div>
                </div>
              ))}

              {visits.length === 0 && (
                <p className="text-black/50 text-sm">
                  Belum ada data kunjungan
                </p>
              )}
            </div>
          </div>


          {/* Quick Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-white">
              <p className="text-sm mb-2">Rata-rata / Hari</p>
              <h3 className="text-3xl font-bold">
                {Math.floor(totalVisits / 30)}
              </h3>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-white">
              <p className="text-sm mb-2">Negara Terbanyak</p>
              <h3 className="text-3xl font-bold">
                {country[0]?.country || "---"}
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
