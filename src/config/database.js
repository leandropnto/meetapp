module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  password: 'docker',
  database: 'meet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
