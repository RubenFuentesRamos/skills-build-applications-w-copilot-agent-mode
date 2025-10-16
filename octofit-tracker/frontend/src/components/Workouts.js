import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results ? data.results : data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title display-6 mb-4">Workouts</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                {workouts[0] && Object.keys(workouts[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  {Object.values(workout).map((val, i) => (
                    <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
