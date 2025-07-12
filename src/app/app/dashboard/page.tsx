export default function Dashboard() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      

      {/* Placeholder content box */}
      <div className="bg-white dark:bg-zinc-900 rounded shadow-md p-6 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Subjects Overview
        </h1>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Quick Stats
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Total Subjects: 12</li>
            <li>Completed Subjects: 5</li>
            <li>Subjects in Progress: 7</li>
          </ul>
        </section>


        <section>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Useful Links
          </h2>
          <ul className="list-disc list-inside text-blue-600 dark:text-blue-400 underline cursor-pointer space-y-1">
            <li>View All Subjects</li>
            <li>Grades & Reports</li>
            <li>Settings</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
