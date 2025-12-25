import { ActivityCalendar } from 'react-activity-calendar';
import { useTranslation } from 'react-i18next';

const GithubGraph = () => {
  const { t } = useTranslation();

  // Custom theme matching the dark neon aesthetic
  // react-activity-calendar requires exactly 2 or 5 colors
  const theme = {
    light: [
      'transparent', // Level 0 - No contributions
      '#1a0a2e', // Level 1 - Dark purple
      '#4a148c', // Level 2 - Medium purple
      '#7b2cbf', // Level 3 - Bright purple
      '#00f5ff', // Level 4 - Bright cyan (max)
    ],
    dark: [
      'transparent', // Level 0 - No contributions
      '#1a0a2e', // Level 1 - Dark purple
      '#4a148c', // Level 2 - Medium purple
      '#7b2cbf', // Level 3 - Bright purple
      '#00f5ff', // Level 4 - Bright cyan (max)
    ],
  };

  // Sample data - Replace with your actual GitHub contribution data
  // You can fetch this from GitHub API or use a service like GitHub Contributions API
  const sampleData = [
    { date: '2024-01-01', count: 2, level: 1 },
    { date: '2024-01-02', count: 5, level: 2 },
    { date: '2024-01-03', count: 8, level: 3 },
    { date: '2024-01-04', count: 12, level: 4 },
    { date: '2024-01-05', count: 15, level: 4 },
    // Add more dates as needed
  ];

  // Generate last 365 days of data (you should replace this with real data)
  const generateData = () => {
    const data = [];
    const today = new Date();
    for (let i = 365; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Random data for demo - replace with actual GitHub data
      const count = Math.floor(Math.random() * 20);
      const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 4));
      
      data.push({
        date: dateStr,
        count,
        level,
      });
    }
    return data;
  };

  const calendarData = generateData();

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 gradient-text text-center">
        Coding Activity
      </h3>
      <div className="flex justify-center">
        <ActivityCalendar
          data={calendarData}
          theme={theme}
          colorScheme="dark"
          labels={{
            totalCount: '{{count}} contributions in {{year}}',
          }}
          blockSize={12}
          blockRadius={3}
          blockMargin={3}
          fontSize={14}
        />
      </div>
      <p className="text-center text-gray-400 text-sm mt-4">
        GitHub contribution graph
      </p>
    </div>
  );
};

export default GithubGraph;

