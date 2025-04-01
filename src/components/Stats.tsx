import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAuth0 } from '@auth0/auth0-react';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);
// Custom panel for tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Retrieve user-specific scores from backend
const fetchUserScores = async (gameKey, username) => {
  try {
    const response = await fetch(`/api/scores?game=${gameKey}&username=${username}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const scores = await response.json();
    // Convert timestamp to date string
    return scores.map((score) => ({
      x: new Date(score.timestamp).toLocaleDateString(),
      y: score.score
    }));
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Retrieve all scores from backend
const fetchAllScores = async (gameKey) => {
  try {
    const response = await fetch(`/api/scores?game=${gameKey}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const allScores = await response.json();
    return allScores.map((score) => score.score);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// Get distribution of all scores and add user's best score to dataset
export const createDistribution = (allScores, userScore) => {
  const sortedScores = [...allScores].sort((a, b) => a - b);

  return {
    labels: sortedScores,
    datasets: [
      {
        label: 'All Scores',
        data: sortedScores.map((score, index) => ({
          y: score,
          x: (index + 1) / sortedScores.length
        })).sort((a, b) => a.x - b.x),
        borderColor: 'rgba(0, 0, 255, 0.5)',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        fill: false,
      },
      {
        label: 'Your Score',
        data: [],
        borderColor: 'rgba(255, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        fill: false,
      }
    ],
    options: {
      scales: {
        x: {
          display: false,
          ticks: {
            display: false,
          }
        },
        y: {
          title: {
            display: true,
            text: 'Scores'
          },
          beginAtZero: true,
        },
        
      }
    }
  }
};

// Sort user scores by date
export const processTimeSeriesData = (userScores) => {
  return userScores.sort((a, b) => new Date(a.x) - new Date(b.x));
};

const games = [
  { name: 'Reaction Time', key: 'reaction_time' },
  { name: 'Memory Test', key: 'memory_test' },
  { name: 'Sequence Memory', key: 'sequence_memory' },
  { name: 'Aim Trainer', key: 'aim_trainer' },
  { name: 'Typing Test', key: 'typing_test' }
];

const Stats = () => {
  const { user } = useAuth0();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [scoresData, setScoresData] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const loadScores = async () => {
      setLoading(true);
      const newScoresData = {};

      for (const game of games) {
        try {
          // Fetch all scores and user scores for each game
          const allScores = await fetchAllScores(game.key);
          const userScores = await fetchUserScores(game.key, user?.nickname);
          const userBestScore = Math.max(...userScores.map(score => score.y));
          const timeSeriesData = processTimeSeriesData(userScores);
          const distributionData = createDistribution(allScores, userBestScore);

          // Add game data to state
          newScoresData[game.key] = {
            allScoresChart: distributionData,
            userScoresChart: {
              labels: timeSeriesData.map(d => d.x),
              datasets: [{
                label: 'Scores Over Time',
                data: timeSeriesData.map(d => d.y),
                fill: false,
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1
              }]
            },
            userBestScore: userBestScore,
          };
        } catch (error) {
          console.error(`Error loading scores for game ${game.key}:`, error);
        }
      }

      setScoresData(newScoresData);
      setLoading(false);
    };

    if (user) {
      loadScores();
    }
  }, [user]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="game tabs">
          {games.map((game, index) => (
            <Tab key={game.key} label={game.name} id={`simple-tab-${index}`} aria-controls={`simple-tabpanel-${index}`} />
          ))}
        </Tabs>
      </Box>
      {games.map((game, index) => (
        <TabPanel key={game.key} value={value} index={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Position Among All Scores
              </Typography>
              <Box sx={{ height: '300px', width: '100%' }}>
                {/* Chart showing the distribution of all scores */}
                {scoresData[game.key] && scoresData[game.key].allScoresChart ? (
                  <Line
                  data={scoresData[game.key].allScoresChart}
                  options={{
                    scales: {
                      x: {
                        ticks: {
                          display: false
                        }
                      },
                      y: {
                        beginAtZero: true
                      }
                    },
                    // Add a line to show the user's best score
                    plugins: {
                      annotation: {
                        annotations: {
                          userBestScoreLine: {
                            type: 'line',
                            yMin: scoresData[game.key].userBestScore,
                            yMax: scoresData[game.key].userBestScore,
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 2,
                            label: {
                              content: 'Your Best Score',
                              enabled: true,
                              position: 'start',
                            }
                          }
                        }
                      }
                    }
                  }}
                />
                ) : (
                  <Typography>No data available.</Typography>
                )}
              </Box>
              <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
                Your Scores Over Time
              </Typography>
              {/* Chart showing the user's scores over time */}
              <Box sx={{ height: '300px', width: '100%' }}>
                {scoresData[game.key] ? (
                  <Line data={scoresData[game.key].userScoresChart} />
                ) : (
                  <Typography>No data available.</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      ))}
    </Box>
  );
};

export default Stats;