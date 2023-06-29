const Budget = require("./budget");
const BudgetUser = require("./budgetUser");
const Expense = require("./expense");
const FundSource = require("./fundSource");
const User = require("./user");

const initAssociations = () => {
    // --- User
    User.belongsToMany(Budget, { through: BudgetUser, foreignKey: 'user_id', otherKey: 'budget_id' });

    User.hasMany(Expense, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });
    Expense.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });

    User.hasMany(FundSource, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });
    FundSource.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });

    User.hasMany(BudgetUser, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    });
    // --- User

    // --- Budget
    Budget.belongsToMany(User, { through: BudgetUser, foreignKey: 'budget_id', otherKey: 'user_id'});

    Budget.hasMany(FundSource, {
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
    });
    FundSource.belongsTo(Budget, {
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
    });

    Budget.hasMany(Expense, {
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
    });
    Expense.belongsTo(Budget, {
        foreignKey: 'budget_id',
        onDelete: 'CASCADE'
    });
    // --- Budget

    // --- Fund Source
    FundSource.hasMany(Expense, {
        foreignKey: 'fund_source_id',
        onDelete: 'CASCADE'
    });
    Expense.belongsTo(FundSource, {
        foreignKey: 'fund_source_id',
        onDelete: 'CASCADE'
    });
    // --- Fund Source

};

module.exports = initAssociations;