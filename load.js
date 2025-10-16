const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

// 获取项目根目录
const rootDir = path.resolve(__dirname);
const casesDir = path.join(rootDir, "src", "cases");
const dbPath = path.join(rootDir, "db.json");

/**
 * 读取db.json文件
 */
function readDatabase() {
    try {
        const dbContent = fs.readFileSync(dbPath, "utf8");
        return JSON.parse(dbContent);
    } catch (error) {
        console.error("读取db.json文件失败:", error);
        process.exit(1);
    }
}

/**
 * 获取所有分类目录
 */
function getCategoryDirectories() {
    return fs.readdirSync(casesDir).filter((dir) => {
        return fs.statSync(path.join(casesDir, dir)).isDirectory();
    });
}

/**
 * 处理分类数据
 * @param {string[]} categoryDirs 分类目录列表
 * @returns {Object} 包含分类信息和特效数组的对象
 */
function processCategories(categoryDirs) {
    const categories = [];
    const effects = [];

    // 遍历所有分类目录
    categoryDirs.forEach((categoryDir, categoryIndex) => {
        // 添加分类到categories数组
        const category = {
            id: categoryIndex + 1,
            name: categoryDir,
        };
        categories.push(category);

        // 获取该分类下的所有特效目录
        const categoryPath = path.join(casesDir, categoryDir);
        const effectDirs = fs.readdirSync(categoryPath).filter((dir) => {
            return fs.statSync(path.join(categoryPath, dir)).isDirectory();
        });

        // 遍历该分类下的所有特效目录
        effectDirs.forEach((effectDir) => {
            const indexPath = path.join(categoryPath, effectDir, "index.json");

            if (fs.existsSync(indexPath)) {
                try {
                    const content = fs.readFileSync(indexPath, "utf8");
                    const effectData = JSON.parse(content);

                    // 获取文件的创建时间
                    const stats = fs.statSync(indexPath);
                    const createTime = dayjs(stats.birthtime).format("YYYY-MM-DD HH:mm:ss");

                    // 添加id、createTime和category字段
                    const effect = {
                        id: effects.length + 1,
                        path: `cases/${categoryDir}/${effectDir}`,
                        ...effectData,
                        category: categoryDir, // 使用目录名作为分类
                        createTime: createTime,
                    };

                    effects.push(effect);
                } catch (error) {
                    console.error(`处理${categoryDir}/${effectDir}/index.json时出错:`, error);
                }
            }
        });
    });

    return { categories, effects };
}

/**
 * 对特效进行排序并重新分配ID
 * @param {Array} effects 特效数组
 * @returns {Array} 排序并重新分配ID后的特效数组
 */
function sortAndReindexEffects(effects) {
    // 按照createTime从大到小排序
    effects.sort((a, b) => {
        return new Date(b.createTime) - new Date(a.createTime);
    });

    // 为排序后的effects重新分配id
    effects.forEach((effect, index) => {
        effect.id = index + 1;
    });

    return effects;
}

/**
 * 从effects中提取唯一标签
 * @param {Array} effects 特效数组
 * @returns {Array} 唯一标签数组
 */
function extractTagsFromEffects(effects) {
    const tagSet = new Set();
    
    // 收集所有标签
    effects.forEach(effect => {
        if (effect.tags && Array.isArray(effect.tags)) {
            effect.tags.forEach(tag => {
                tagSet.add(tag);
            });
        }
    });
    
    // 转换为数组并添加ID
    const tags = Array.from(tagSet).map((tag, index) => ({
        id: index + 1,
        name: tag
    }));
    
    return tags;
}

/**
 * 将数据写入db.json文件
 * @param {Object} db 数据库对象
 * @param {Array} effects 特效数组
 * @param {Array} categories 分类数组
 * @param {Array} tags 标签数组
 */
function writeDatabase(db, effects, categories, tags) {
    // 更新db.json中的effects、categories和tags数据
    db.effects = effects;
    db.categories = categories;
    db.tags = tags;

    // 写入更新后的db.json
    try {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
        console.log(`成功更新db.json，共处理了${effects.length}个特效、${categories.length}个分类和${tags.length}个标签`);
    } catch (error) {
        console.error("写入db.json文件失败:", error);
        process.exit(1);
    }
}

/**
 * 主函数
 */
async function main() {
    // 读取db.json文件
    const db = readDatabase();

    // 获取所有分类目录
    const categoryDirs = getCategoryDirectories();

    // 处理分类和特效数据
    const { categories, effects } = processCategories(categoryDirs);

    // 对特效进行排序并重新分配ID
    const sortedEffects = sortAndReindexEffects(effects);

    // 从特效中提取标签
    const tags = extractTagsFromEffects(sortedEffects);

    // 写入数据库
    writeDatabase(db, sortedEffects, categories, tags);
}

// 执行主函数
main();
