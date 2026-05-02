import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { useLanguage } from '../contexts/LanguageContext';
import { loadContent } from '../utils/contentLoader';
import { AnimatedPage } from '../components/AnimatedPage';
import { SectionHeader } from '../components/SectionHeader';

function WeekDetailPage({ weekNumber }: { weekNumber: number }) {
    const { language } = useLanguage();
    const content = loadContent(`worklog/week-${weekNumber}`, language);

    return (
        <AnimatedPage>
            <div className="page-container">
                <Breadcrumb items={[
                    { label: 'Worklog', path: '/worklog' },
                    { label: `Week ${weekNumber}` }
                ]} />

                <SectionHeader
                    icon="worklog"
                    title={`Week ${weekNumber}`}
                />

                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-sm mb-12">
                    <MarkdownRenderer content={content} />
                </div>
            </div>
        </AnimatedPage>
    );
}

export function Week1Page() { return <WeekDetailPage weekNumber={1} />; }
export function Week2Page() { return <WeekDetailPage weekNumber={2} />; }
export function Week3Page() { return <WeekDetailPage weekNumber={3} />; }
export function Week4Page() { return <WeekDetailPage weekNumber={4} />; }
export function Week5Page() { return <WeekDetailPage weekNumber={5} />; }
export function Week6Page() { return <WeekDetailPage weekNumber={6} />; }
export function Week7Page() { return <WeekDetailPage weekNumber={7} />; }
export function Week8Page() { return <WeekDetailPage weekNumber={8} />; }

export function WorklogPage() {
    const { language } = useLanguage();

    const weeks = [
        { 
            week: 1, 
            task: { 
                en: 'Team onboarding, AWS fundamentals learning, and SpendWise project planning.', 
                vi: 'Làm quen đội ngũ, học các dịch vụ AWS cơ bản và lập kế hoạch dự án SpendWise.' 
            },
            preview: {
                en: 'Defined system architecture and prepared core knowledge for cloud deployment.',
                vi: 'Xây dựng kiến trúc hệ thống và chuẩn bị kiến thức nền cho triển khai cloud.'
            }
        },
        { 
            week: 2, 
            task: { 
                en: 'Infrastructure setup using Terraform and AWS networking configuration.', 
                vi: 'Thiết lập hạ tầng bằng Terraform và cấu hình mạng AWS.' 
            },
            preview: {
                en: 'Provisioned VPC, subnets, and core infrastructure ready for container deployment.',
                vi: 'Triển khai VPC, subnet và hạ tầng sẵn sàng cho container deployment.'
            }
        },
        { 
            week: 3, 
            task: { 
                en: 'Deploy backend on ECS Fargate and integrate authentication with Cognito.', 
                vi: 'Triển khai backend trên ECS Fargate và tích hợp xác thực Cognito.' 
            },
            preview: {
                en: 'Enabled secure authentication and successfully deployed containerized backend.',
                vi: 'Thiết lập xác thực an toàn và deploy backend container thành công.'
            }
        },
        { 
            week: 4, 
            task: { 
                en: 'Deploy RDS database and implement secrets management and HTTPS.', 
                vi: 'Triển khai database RDS và bảo mật dữ liệu, cấu hình HTTPS.' 
            },
            preview: {
                en: 'Secured system with private database, encrypted credentials, and HTTPS domain.',
                vi: 'Bảo mật hệ thống với database private, quản lý secrets và HTTPS.'
            }
        },
        { 
            week: 5, 
            task: { 
                en: 'Set up monitoring, logging, and cost control mechanisms.', 
                vi: 'Thiết lập monitoring, logging và kiểm soát chi phí.' 
            },
            preview: {
                en: 'Established observability system and implemented automated cost alerts.',
                vi: 'Xây dựng hệ thống giám sát và cảnh báo chi phí tự động.'
            }
        },
        { 
            week: 6, 
            task: { 
                en: 'Enhance security and automate backend workflows.', 
                vi: 'Tăng cường bảo mật và tự động hóa backend.' 
            },
            preview: {
                en: 'Protected system using WAF and automated user data synchronization.',
                vi: 'Bảo vệ hệ thống bằng WAF và tự động đồng bộ dữ liệu người dùng.'
            }
        },
        { 
            week: 7, 
            task: { 
                en: 'Optimize performance, implement auto-scaling, and reduce costs.', 
                vi: 'Tối ưu hiệu năng, triển khai auto-scaling và giảm chi phí.' 
            },
            preview: {
                en: 'Improved scalability and reduced infrastructure costs through optimization.',
                vi: 'Cải thiện khả năng mở rộng và giảm chi phí hạ tầng.'
            }
        },
        { 
            week: 8, 
            task: { 
                en: 'Finalize documentation, validate DR, and complete project delivery.', 
                vi: 'Hoàn thiện tài liệu, kiểm thử DR và bàn giao dự án.' 
            },
            preview: {
                en: 'Completed full system delivery with validated recovery and production-ready documentation.',
                vi: 'Hoàn tất bàn giao hệ thống với DR đã kiểm chứng và tài liệu đầy đủ.'
            }
        },
    ];

    const getPhaseLabel = (week: number) => {
        if (week <= 2) return language === 'en' ? 'Foundation' : 'Nền tảng';
        if (week <= 6) return language === 'en' ? 'Development' : 'Phát triển';
        if (week === 7) return language === 'en' ? 'Optimization' : 'Tối ưu';
        return language === 'en' ? 'Delivery' : 'Bàn giao';
    };

    return (
        <AnimatedPage>
            <div className="page-container">
                <Breadcrumb items={[{ label: 'Worklog' }]} />

                <SectionHeader
                    icon="worklog"
                    title={language === 'en' ? 'WORKLOG' : 'NHẬT KÝ THỰC TẬP'}
                />

                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 shadow-sm mb-12">
                    <p className="text-text-secondary mb-6 text-lg leading-relaxed">
                        {language === 'en'
                            ? 'This worklog chronicles the 8-week evolution of SpendWise, from initial onboarding and system design to full deployment and final delivery.'
                            : 'Nhật ký này ghi lại quá trình phát triển 8 tuần của SpendWise, từ giai đoạn khởi đầu, thiết kế hệ thống đến triển khai và bàn giao hoàn chỉnh.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {weeks.map((item) => (
                        <Link
                            key={item.week}
                            to={`/worklog/week-${item.week}`}
                            className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="week-badge">
                                        {item.week}
                                    </div>
                                    <div className="text-accent-orange font-semibold text-sm">
                                        {getPhaseLabel(item.week)}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-accent-orange transition-colors">
                                    {language === 'en' ? `Week ${item.week}` : `Tuần ${item.week}`}
                                </h3>

                                <p className="text-gray-600 font-medium text-sm mb-3">
                                    {item.task[language]}
                                </p>
                                
                                <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-accent-orange/30">
                                    <p className="text-gray-500 text-xs italic leading-relaxed">
                                        {item.preview[language]}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 flex items-center text-sm font-medium text-accent-orange opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    {language === 'en' ? 'View Details' : 'Xem Chi Tiết'}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AnimatedPage>
    );
}