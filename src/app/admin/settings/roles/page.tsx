"use client";

import { useEffect, useState } from "react";
import { firebaseDatabase } from "../../../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { setUserRole } from "../../../../lib/auth";

type UserItem = { uid: string; email?: string; role?: string };

export default function RolesPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [savingUid, setSavingUid] = useState<string | null>(null);

  useEffect(() => {
    const r = ref(firebaseDatabase, "/users");
    return onValue(r, (snap) => {
      const val = snap.val() || {};
      const list: UserItem[] = Object.entries(val).map(([k, v]: any) => ({ uid: k, email: v.email, role: v.role }));
      setUsers(list);
    });
  }, []);

  const handleChange = async (uid: string, role: string) => {
    setSavingUid(uid);
    try {
      await setUserRole(uid, role);
    } catch (err) {
      console.error(err);
      alert("Không thể cập nhật role");
    } finally {
      setSavingUid(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl text-[#efdfa6]">
      <div className="mb-6 rounded-[2rem] border border-[#1f2937] bg-[#08121f] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <h1 className="text-2xl font-semibold text-white">Quản lý Roles</h1>
        <p className="mt-1 text-sm text-[#b9b3a1]">Kiểm soát quyền truy cập và vai trò người dùng trong hệ thống.</p>
      </div>
      <div className="overflow-hidden rounded-[2rem] bg-[#08121f] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-[#1f2937]">
        <table className="w-full table-auto text-left text-sm">
          <thead className="text-[#cbbd8b]">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">UID</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-[#e7dfb7]">
            {users.map((u) => (
              <tr key={u.uid} className="border-t border-[#1f2937]">
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.uid}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">
                  <select defaultValue={u.role || "editor"} onChange={(e) => handleChange(u.uid, e.target.value)} className="mr-2 rounded-full border border-[#2c3a4c] bg-[#0d1523] px-3 py-2 text-sm text-[#efdfa6] outline-none">
                    <option value="editor">editor</option>
                    <option value="admin">admin</option>
                  </select>
                  {savingUid === u.uid ? <span className="text-sm text-[#94a3b8]">Đang lưu...</span> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
