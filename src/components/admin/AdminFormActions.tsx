"use client";

type AdminFormActionsProps = {
  saving: boolean;
  submitLabel: string;
  onCancel: () => void;
  /** Sit above the mobile bottom tab bar (h-16). Use false on pages where the tab bar is hidden. */
  aboveTabBar?: boolean;
};

export function AdminFormActions({
  saving,
  submitLabel,
  onCancel,
  aboveTabBar = true,
}: AdminFormActionsProps) {
  return (
    <div
      className={`fixed inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200 safe-bottom md:static md:z-auto md:bg-transparent md:backdrop-blur-none md:border-0 md:p-0 ${
        aboveTabBar ? "bottom-16 md:bottom-auto" : "bottom-0"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 md:px-0">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 md:flex-none md:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold py-3.5 md:py-2.5 px-6 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50 active:scale-[0.98]"
        >
          {saving ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            submitLabel
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex-1 md:flex-none md:w-auto py-3.5 md:py-2.5 px-6 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
