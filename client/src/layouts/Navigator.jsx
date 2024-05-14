const navigation = [
  { name: 'Login', href: '/', current: true },
  { name: 'Sing up', href: '/singup', current: false },
  { name: 'Reset your password', href: '/singup', current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const Navigator = () => {
  return (
    <div className="min-h-full">
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigator;
